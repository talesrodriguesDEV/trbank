import Client from '../models/Client';
import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces/IRequest';

const getClientById = async (req: IRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const client = await Client.findById(id);

  if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });

  req.client = client;

  return next();
};

export default getClientById;
