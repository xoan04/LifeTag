const fs = require('fs');
fs.mkdirSync('src/app/[lang]', { recursive: true });
fs.renameSync('src/app/dashboard', 'src/app/[lang]/dashboard');
fs.renameSync('src/app/id', 'src/app/[lang]/id');
fs.renameSync('src/app/login', 'src/app/[lang]/login');
fs.renameSync('src/app/register', 'src/app/[lang]/register');
fs.renameSync('src/app/layout.tsx', 'src/app/[lang]/layout.tsx');
fs.renameSync('src/app/page.tsx', 'src/app/[lang]/page.tsx');
