import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

import categories from './routes/categories';
import businesses from './routes/businesses';
import bookingRoutes from './routes/bookingRoutes';
import { connectToDb, PORT } from './db';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/categories', categories);
app.use('/businesses', businesses);
app.use('/bookings', bookingRoutes);

// Prisijungiame prie duomenų bazės ir paleidžiame serverį
connectToDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to the database', err);
  });
