import express, { Request, Response } from 'express';
import { IRequest } from '../interfaces/IRequest';
import Client from '../models/Client';
import getClientById from '../middlewares/getClientById';
import validateClientFields from '../middlewares/validateClientFields';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  const clients = await Client.find();
  
  res.json(clients);
});

router.get('/:id', getClientById, (req: IRequest, res: Response) => res.json(req.client));

router.post('/new', validateClientFields, async (req: Request, res: Response) => {
  const { fullName, CPF, password, balance } = req.body;
  
  const newClient = new Client({ fullName, CPF, password, balance });
  
  await newClient.save();
  
  res.json({ message: 'Cliente adicionado com sucesso.' });
});

router.put('/update/:id', getClientById, async (req: IRequest, res: Response) => {
  const { fullName, CPF, password, balance } = req.body;
  const { client } = req;
  
  if (client && fullName) client.fullName = fullName;
  if (client && CPF) client.CPF = CPF;
  if (client && password) client.password = password;
  if (client && balance) client.balance = balance;
  
  if (client) await client.save();
  
  res.json({ message: 'Cliente atualizado com sucesso.' });
});

router.delete('/delete/:id', getClientById, async (req: IRequest, res: Response) => {
  if (req.client) req.client.remove();
  
  res.json({ message: 'Cliente deletado com sucesso.' });
});

export default router;
