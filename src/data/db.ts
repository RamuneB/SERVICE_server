import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Įkeliame aplinkos kintamuosius iš .env failo
dotenv.config();

const uri = process.env.MONGODB_URI; // Naudojame MONGODB_URI iš .env failo
export const PORT = process.env.PORT || 3000; // Naudojame PORT iš .env, jei nėra - default į 3000

if (!uri) {
  throw new Error('MONGODB_URI kintamasis nėra nustatytas!');
}

export const connectToDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Prisijungta prie MongoDB');
  } catch (err) {
    console.error('Klaida jungiantis prie MongoDB:', err);
    throw err; // Užfiksuoja klaidą
  }
};
