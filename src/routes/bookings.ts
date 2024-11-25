import express, { Request, Response } from 'express';
const router = express.Router();

// Gauti užsakymus pagal vartotojo el. paštą
router.get('/user/:email', (req: Request, res: Response) => {
  const { email } = req.params;
  res.send(`Gauti užsakymus vartotojui su el. paštu: ${email}`);
});

// Sukurti naują užsakymą
router.post('/', (req: Request, res: Response) => {
  res.send('Sukurti naują užsakymą');
});

export default router;
