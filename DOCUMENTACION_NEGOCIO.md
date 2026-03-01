# Prompt de Arquitectura y Lógica de Negocio para el Backend de LifeTag

**Instrucción para la IA o Equipo de Backend:**
Actúa como un Arquitecto de Software y Desarrollador Backend Senior. Tu tarea es diseñar e implementar el backend para un SaaS llamado **LifeTag**. A continuación, se detalla toda la lógica de negocio, los modelos de datos esperados, los endpoints clave y las reglas de seguridad. 

---

## 1. Visión General del Producto (LifeTag)
LifeTag es una plataforma SaaS de "Identidad de Emergencia". Los usuarios pagan una suscripción para gestionar perfiles de emergencia de sus familiares (humanos) o mascotas. La empresa vende productos físicos (placas con código QR o etiquetas NFC) que contienen un token único. Cualquier persona que encuentre una emergencia, al escanear la placa, es redirigida sin necesidad de aplicación a un Perfil Público de Emergencia para ver datos vitales (alergias crónicas, tipo de sangre, veterinario, etc.) y contactar a los responsables.

---

## 2. Tipos de Usuarios / Actores
1. **Account Owner (Propietario de la cuenta):** 
   - Se registra en la plataforma.
   - Paga una suscripción (Essential, Family, Pro) que determina cuántos perfiles puede crear.
   - Posee credenciales (Email y Contraseña) y JWT en la sesión.
   - Tiene acceso total a un CRUD de Perfiles bajo su cuenta.
2. **Guest (Rescatista / Paramédico / Civil):**
   - No tiene sesión, ni aplicación móvil.
   - Su único punto de acceso es escanear la placa que lo redirige a la URL `/id/[deviceToken]`.
   - Tiene acceso de SOLO LECTURA estricto a la vista pública de emergencia y disparará (inadvertidamente) la creación de un "ScanLog" que notifica al dueño de su ubicación/hora.

---

## 3. Esquema de Base de Datos Orientado a Relaciones
Se recomienda fuertemente una base de datos SQL (ej. PostgreSQL) utilizando un ORM como Prisma o TypeORM. A continuación las entidades centrales y sus relaciones:

### A. Usuario (User)
Representa la cuenta que paga y administra.
- `id` (UUID, PK)
- `email` (String, Unique)
- `passwordHash` (String)
- `subscriptionPlan` (Enum: FREE, ESSENTIAL, FAMILY, PRO)
- `subscriptionStatus` (Enum: ACTIVE, PAST_DUE, CANCELLED)
- **Relaciones:** 1 Usuario tiene muchos Perfiles (`1:N`).

### B. Perfil (Profile)
Tabla principal de identidades virtuales. Un usuario gestiona las distintas identidades (él mismo, su esposa, su perro).
- `id` (UUID, PK)
- `userId` (UUID, FK a User)
- `type` (Enum: HUMAN, PET)
- `name` (String)
- `isActive` (Boolean) - Si es *false*, no se muestra nada públicamente.
- `createdAt` / `updatedAt`
- **Relaciones:** 1 Perfil puede tener N Dispositivos asignados (`1:N`).

#### B.1. Metadatos si `type === HUMAN`
- `bloodType` (String)
- `allergies` (Array de Strings)
- `medicalConditions` (Array de Strings)
- `medications` (Array de Strings)
- `emergencyContact1_name`, `emergencyContact1_phone`, `emergencyContact1_relation`
- `emergencyContact2_name`, `emergencyContact2_phone`, `emergencyContact2_relation`

#### B.2. Metadatos si `type === PET`
- `species` (String, ej. "Perro")
- `breed` (String)
- `vaccinationStatus` (String)
- `targetReward` (String, opcional)
- `ownerPhone` (String)
- `veterinarian_name`, `veterinarian_phone`

### C. Dispositivo / Tag Físico (Device)
Representa el objeto físico del mundo real.
- `id` (UUID, PK)
- `deviceToken` (String, unique, indexado) - Ej: "JD928K". **Este es el ID que va en el anillo NFC o QR**.
- `deviceType` (Enum: QR_TAG, NFC_CARD, STICKER)
- `status` (Enum: UNACTIVATED, ACTIVE, LOST, DISABLED)
- `profileId` (UUID, FK a Profile, Nullable) - Es null hasta que el cliente lo vincula.
- **Relaciones:** Pertenece a 0 o 1 Perfil. Genera N ScanLogs (`1:N`).

### D. Registro de Escaneo (ScanLog)
Auditoría vital para encontrar mascotas perdidas o saber dónde se accidentó un paciente.
- `id` (UUID, PK)
- `deviceId` (UUID, FK a Device)
- `scannedAt` (DateTime)
- `ipAddress` (String)
- `userAgent` (String)
- `latitude` / `longitude` (Float, Nullable) - Extraídos de la petición del paramédico si da permisos.

---

## 4. Endpoints de la API Central y Casos de Uso

**Módulo de Autenticación (`/api/auth`)**
1. `POST /api/auth/register`: Crea un nuevo usuario y retorna JWT + Cookie de sesión de larga duración.
2. `POST /api/auth/login`: Autentica el email y password, retorna JWT.

**Módulo de Perfiles Securizado (`/api/profiles`) - Requiere JWT**
1. `GET /api/profiles`: Lista todos los perfiles que le pertenecen exclusivamente al usuario autenticado. (Regla: Checkear que el `userId` jwt matchee en la DB).
2. `POST /api/profiles`: Crear un nuevo perfil, validando el límite máximo según la suscripción.
3. `PUT /api/profiles/:id`: Edita la info de un perfil existente (Chequear ownership).
4. `DELETE /api/profiles/:id`: Borra un perfil en cascada y libera los devices o los marca como desactivados.

**Módulo de Dispositivos Securizado (`/api/devices`) - Requiere JWT**
1. `GET /api/devices`: Muestra todos los devices activados de un usuario.
2. `POST /api/devices/activate`: 
   - **Body:** `{ "deviceToken": "JD928K", "profileId": "UUID" }`
   - **Flujo Lógico:** Busca el token. Si no existe, lanza 404. Si su estado no es `UNACTIVATED`, lanza 400 (ya está en uso). Si todo está OK, asocia el `profileId`, cambia el estatus a `ACTIVE` y se apropia del dispositivo.
3. `POST /api/devices/:id/report-lost`: Cambia el modo a `LOST`. Avisa al próximo que escanee que es un objeto/mascota robada o perdida.

**Módulo Público de Emergencias (`/api/public`) - NO requiere JWT**
1. `GET /api/public/emergency-profile/:deviceToken`: 
   - **Punto de Entrada Crítico (Máxima concurrencia).**
   - Recibe y lee un token (Ej. "JD928K").
   - **Reglas del Negocio:**
     1. Busca el Device en base de datos. Si no existe -> Error 404 genérico.
     2. Revisa el estado. Si es `DISABLED`, retorna `{ error: "Inactive Profile" }`.
     3. Chequea el Profile asociado. Si el `isActive` del Profile asociado es false -> `{ error: "Inactive Profile" }`.
     4. Registra asíncronamente en la Base de Datos un nuevo `ScanLog` (guardando hora y geolocalización o IP). Dispara evento de "Push Notification" (optativo futuro) o un Mail al dueño notificando.
     5. Retorna 100% de la metadata en forma de JSON estructurado del Perfil para pintar el Frontend en Modo Paramédico (rojo, alertas).

---

## 5. Requerimientos No Funcionales

1. **Rendimiento:** El endpoint de lectura pública `GET /api/public/emergency-profile/:deviceToken` debe de cachearse con Redis si es necesario en un futuro (es altamente probable un pico de scaneo simultáneo en un accidente). El tiempo de respuesta de ese fetch debe ser menor a 150ms.
2. **Seguridad / ID:** Los `deviceToken` nunca deben ser iterativos ni adivinables (no `1, 2, 3...`). Los QR usarán hashes alfanuméricos en base62 de al menos 6-8 caracteres como en el modelo: `BX773P` para evitar scraping o fuerza bruta de perfiles públicos de gente enferma.
3. **Resiliencia:** Si la escritura del `ScanLog` falla al momento que el paramédico escanea la placa, fallar silenciosamente; el perfil público DEBE cargar de igual manera. La visualización de los datos es la prioridad número uno salva vidas.

**Tu tarea inmediata (Ingeniero Backend):**
Por favor, propón el esquema inicial (schema.prisma o similar), define la estructura de controladores, el stack ideal, e inyecta la autenticación básica descrita aquí.
