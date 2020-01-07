// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Vencimiento del token
// 60 segundo
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = '48h';

//  SEED de autenticacion
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrrollo';

// Base de datos
let urlDB;

if (process.env.NODE_ENV !== 'dev') {
    urlDB = 'mongodb+srv://kcirepunk:1OJvkVEL9F3iTUpn@cluster0-chnab.mongodb.net/cafe';
} else {
    urlDB = 'mongodb://localhost:27017/cafe';
}

process.env.URLDB = urlDB;

// Google Client ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '225867255768-06sbmnmk727b4t00p0cuc27no7go1i53.apps.googleusercontent.com';