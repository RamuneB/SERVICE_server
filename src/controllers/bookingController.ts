import { Request, Response } from 'express';
import Booking from '../models/Booking'; // Jei Booking yra TypeScript modelis, naudokite import vietoje require

/**
 * Gauti užsakymus pagal naudotojo el. pašto adresą.
 */
export const getBookingsByUserEmail = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.params;

  try {
    const bookings = await Booking.find({ userEmail: email });

    if (!bookings || bookings.length === 0) {
      res.status(404).json({ message: 'No bookings found for the given email' });
      return;
    }

    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

/**
 * Sukurti naują užsakymą.
 */
export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const booking = new Booking(req.body);

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error('Error creating booking:', err);

    res.status(400).json({
      error: 'Failed to create booking',
      details: err instanceof Error ? err.message : 'Unknown error',
    });
  }
};

// Pridėkite kitus BookingController metodus čia...
