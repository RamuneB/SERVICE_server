import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Įkelia .env failą

const app = express();
const port = process.env.PORT || 3000;

// MongoDB URI iš .env failo
const uri = process.env.MONGODB_URI as string;

async function startServer() {
  try {
    // Bandome prisijungti prie MongoDB
    await mongoose.connect(uri);
    console.log('Prisijungta prie MongoDB');

    // Jei prisijungimas sėkmingas, paleidžiame serverį
    app.listen(port, () => {
      console.log(`Serveris veikia ant port ${port}`);
    });
  } catch (error) {
    // Klaidos apdorojimas, jei prisijungimas prie MongoDB nepavyksta
    console.error('Nepavyko prisijungti prie MongoDB:', error);
    process.exit(1); // Uždaro procesą, nes prisijungimas nepavyko
  }
}

// Paleidžiame serverį
startServer();

// Globalus klaidų stebėjimas
process.on('uncaughtException', (err) => {
  console.error('Neapdorota klaida:', err);
  process.exit(1); // Uždaroma programa dėl neapdorotos klaidos
});
