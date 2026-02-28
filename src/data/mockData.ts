import { Profile, ScanLog, Device } from '../types/profile';

export const mockProfiles: Profile[] = [
    {
        id: 'p-1',
        userId: 'u-1',
        publicProfileId: 'juan-perez-1',
        type: 'HUMAN',
        name: 'Juan Perez',
        isActive: true,
        bloodType: 'O+',
        allergies: ['Penicillin', 'Peanuts'],
        medicalConditions: ['Hypertension'],
        medications: ['Lisinopril 10mg'],
        emergencyContact1: { name: 'Maria Perez', phone: '+1234567890', relation: 'Wife' },
        emergencyContact2: { name: 'Carlos Perez', phone: '+1987654321', relation: 'Brother' },
        createdAt: new Date().toISOString(),
    },
    {
        id: 'p-2',
        userId: 'u-1',
        publicProfileId: 'max-dog-1',
        type: 'PET',
        name: 'Max',
        isActive: true,
        species: 'Dog',
        breed: 'Golden Retriever',
        vaccinationStatus: 'Up to date (Rabies, Parvo)',
        veterinarian: { name: 'Dr. Smith (City Vet)', phone: '+1555123456' },
        ownerPhone: '+1234567890',
        reward: '$500 if found safe',
        createdAt: new Date().toISOString(),
    }
];

export const mockScanLogs: ScanLog[] = [
    { id: 's-1', profileId: 'p-1', scannedAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 's-2', profileId: 'p-2', scannedAt: new Date(Date.now() - 3600000).toISOString() },
];

export const mockDevices: Device[] = [
    {
        id: 'd-1',
        profileId: 'p-1',
        deviceType: 'nfc',
        deviceToken: 'JD928K',
        status: 'active',
        createdAt: new Date().toISOString()
    },
    {
        id: 'd-2',
        profileId: 'p-1',
        deviceType: 'sticker',
        deviceToken: 'XY123Z',
        status: 'active',
        createdAt: new Date().toISOString()
    },
    {
        id: 'd-3',
        profileId: 'p-2',
        deviceType: 'qr',
        deviceToken: 'BX773P',
        status: 'active',
        createdAt: new Date().toISOString()
    }
];
