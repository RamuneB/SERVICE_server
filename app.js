// app.js - pagrindinis serverio failas
// Kelias: HomeServiceAPI/app.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); // Įkeliame registracijos ir prisijungimo maršrutus

// Naudojame dotenv, kad užkrautume aplinkos kintamuosius iš .env failo
dotenv.config();

// Inicializuojame aplikaciją
const app = express();
app.use(express.json());

// Prijungiame prie MongoDB su URI iš .env failo
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Sėkmingai prisijungta prie MongoDB!');
  })
  .catch((error) => {
    console.error('Prisijungimo prie MongoDB klaida:', error);
  });

// Naudojame autentifikacijos maršrutus
app.use('/api/auth', authRoutes);

// Pradedame serverį su portu iš .env failo
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveris veikia per prievadą ${PORT}`);
});
