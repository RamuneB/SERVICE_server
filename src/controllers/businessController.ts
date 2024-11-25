import { Request, Response } from 'express';
import Business from '../models/Business'; // Jei naudojate TypeScript modelį, naudokite import vietoje require

/**
 * Gauti visus verslus.
 */
export const getAllBusinesses = async (req: Request, res: Response): Promise<void> => {
  try {
    const businesses = await Business.find();

    if (!businesses || businesses.length === 0) {
      res.status(404).json({ message: 'No businesses found' });
      return;
    }

    res.status(200).json(businesses);
  } catch (err) {
    console.error('Error fetching businesses:', err);
    res.status(500).json({ error: 'Failed to fetch businesses' });
  }
};

/**
 * Gauti verslus pagal kategoriją.
 */
export const getBusinessesByCategory = async (req: Request, res: Response): Promise<void> => {
  const { category } = req.params;

  try {
    const businesses = await Business.find({ category });

    if (!businesses || businesses.length === 0) {
      res.status(404).json({ message: `No businesses found for category: ${category}` });
      return;
    }

    res.status(200).json(businesses);
  } catch (err) {
    console.error('Error fetching businesses by category:', err);
    res.status(500).json({ error: 'Failed to fetch businesses by category' });
  }
};

// Pridėkite kitus BusinessController metodus čia...
