import Client from '../models/Client';
import { NextFunction, Request, Response } from 'express';

const validateClientFields = async (req: Request, res: Response, next: NextFunction) => {
  const { fullName, CPF, password, balance } = req.body;

  const missingField = !fullName || !CPF || !password || !balance;

  if (missingField) return res.status(400).json({ message: 'Dados incompletos' });

  const invalidData = fullName.length < 10 || CPF.length !== 14 || password.length < 5 || typeof balance !== 'number';

  if (invalidData) return res.status(400).json({ message: 'Dados inválidos' });

  const clientAlreadyExists = await Client.exists({ CPF });

  if (clientAlreadyExists) return res.status(400).json({ message: 'Cliente já cadastrado' });

  return next();
};

export default validateClientFields;
