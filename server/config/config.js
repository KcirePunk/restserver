// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos
let urlDB;

if (process.env.NODE_ENV !== 'dev') {
    urlDB = 'mongodb+srv://kcirepunk:1OJvkVEL9F3iTUpn@cluster0-chnab.mongodb.net/cafe';
} else {
    urlDB = 'mongodb://localhost:27017/cafe';
}

process.env.URLDB = urlDB;