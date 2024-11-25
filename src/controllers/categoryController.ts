import { Request, Response } from 'express';
import Category from '../models/Category'; // Jei naudojate TypeScript modelį, naudokite import vietoje require

/**
 * Gauti visas kategorijas.
 */
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();

    if (!categories || categories.length === 0) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }

    res.status(200).json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

/**
 * Sukurti naują kategoriją.
 */
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = new Category(req.body);
    await category.save();

    res.status(201).json(category);
  } catch (err) {
    console.error('Error creating category:', err);

    res.status(400).json({
      error: 'Failed to create category',
      details: err instanceof Error ? err.message : 'Unknown error',
    });
  }
};

// Pridėkite kitus CategoryController metodus čia...
