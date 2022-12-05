import Client from '../models/Client';
import jwt from '../utils/jwt';

import express, { Request, Response } from 'express';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { CPF, password } = req.body;

  if (!CPF || !password) return res.status(400).json({ message: 'Dados incompletos' });

  const userExists = await Client.exists({ CPF });
  const user = await Client.findById(userExists) || { password: '' };

  if (!userExists || user.password !== password) return res.status(400).json({ message: 'Login inválido' });

  const token = jwt.generateToken(CPF);

  res.status(200).json({ token });
});

export default router;
