import express, { Request, Response } from 'express';
import Category from '../models/Category';
import Business from '../models/Business';
import Booking from '../models/Booking';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

/**
 * Gauti visus verslus.
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    console.error('Error fetching businesses:', err);
    res
      .status(500)
      .json({ message: 'Error fetching businesses', error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

/**
 * Sukurti naują verslą.
 */
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const business = req.body;

  try {
    // Patikriname, ar nurodyta kategorija egzistuoja
    const categoryExists = await Category.findOne({ name: business.category });
    if (!categoryExists) {
      res.status(400).json({
        message: 'Failed to add business: specified category does not exist.',
      });
      return;
    }

    // Sukuriame ir išsaugome verslą
    const newBusiness = new Business(business);
    const savedBusiness = await newBusiness.save();
    res.status(201).json(savedBusiness);
  } catch (err) {
    console.error('Server error while adding business:', err);
    res.status(500).json({
      message: 'Server error while adding business.',
      error: (err as Error).message,
    });
  }
});

/**
 * Gauti verslą pagal ID.
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const business = await Business.findById(req.params.id);
    if (business) {
      res.json(business);
    } else {
      res.status(404).send('Business not found');
    }
  } catch (err) {
    console.error('Error fetching business:', err);
    res
      .status(500)
      .json({ message: 'Error fetching business', error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

/**
 * Gauti verslus pagal kategoriją.
 */
router.get('/category/:category', async (req: Request, res: Response): Promise<void> => {
  try {
    const filteredBusinesses = await Business.find({
      category: req.params.category.toLowerCase(),
    });
    res.json(filteredBusinesses);
  } catch (err) {
    console.error('Error fetching businesses by category:', err);
    res.status(500).json({
      message: 'Error fetching businesses by category',
      error: err instanceof Error ? err.message : 'Unknown error',
    });
  }
});

/**
 * Gauti užsakymus pagal verslo ID ir datą.
 */
router.get('/:id/bookings/date/:date', async (req: Request, res: Response): Promise<void> => {
  try {
    const slots = await Booking.find({
      businessId: req.params.id,
      date: new Date(req.params.date),
    });
    res.json(slots);
  } catch (err) {
    console.error('Error fetching bookings for the specified date and business:', err);
    res.status(500).json({
      message: 'Error fetching bookings for the specified date and business',
      error: err instanceof Error ? err.message : 'Unknown error',
    });
  }
});

export default router;
