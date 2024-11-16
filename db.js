// db.js - MongoDB prisijungimo nustatymai
// Kelias: HomeServiceAPI/db.js

const mongoose = require('mongoose');

// MongoDB prisijungimo URL (naudokite savo duomenų bazės pavadinimą)
const uri = 'mongodb://localhost:27017/HomeServiceAPI';

// Pasirenkame `strictQuery` nustatymą, kad pašalintume perspėjimą apie būsimus pokyčius
mongoose.set('strictQuery', true);

// Prisijungiame prie MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Sėkmingai prisijungta prie MongoDB!');
  })
  .catch((error) => {
    console.error('Prisijungimo prie MongoDB klaida:', error);
  });

// Eksportuojame prisijungimą prie duomenų bazės (nebūtina, jei prijungiate tik vieną kartą)
module.exports = mongoose.connection;

