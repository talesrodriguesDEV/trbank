import Client from '../models/Client';
import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces/IRequest';

const validateTransaction = async (req: IRequest, res: Response, next: NextFunction) => {
  const { value, receiver, donor } = req.body;

  if (!receiver || !donor || !value) return res.status(400).json({ message: 'Dados incompletos' });

  if (receiver === donor) return res.status(400).json({ message: 'Cliente não pode receber e enviar a mesma transação.' });

  const invalidData = typeof value !== 'number';

  if (invalidData) return res.status(400).json({ message: 'Valor inválido' });

  const clientReceiver = await Client.findById(receiver);
  const clientDonor = await Client.findById(donor);

  if (!clientReceiver || !clientDonor) return res.status(404).json({ message: 'Cliente(s) não encontrado(s).' });

  if (clientDonor.balance < value) return res.status(400).json({ message: 'Saldo insuficiente' });

  req.receiverClient = clientReceiver;
  req.donorClient = clientDonor;

  return next();
};

export default validateTransaction;
