import express, { Request, Response } from 'express';
import { IRequest } from '../interfaces/IRequest';
import Transaction from '../models/Transaction';
import isUserLogged from '../middlewares/isUserLogged';
import validateTransaction from '../middlewares/validateTransaction';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  const allTransactions = await Transaction.find()
    .populate('receiver', 'fullName')
    .populate('donor', 'fullName');

  res.json(allTransactions);
});

router.use(isUserLogged);

router.post('/new', validateTransaction, async (req: IRequest, res: Response) => {
  const { value, receiver, donor } = req.body;
  const { donorClient, receiverClient } = req;

  if (donorClient && receiverClient) {
    donorClient.balance -= value;
    receiverClient.balance += value;

    await donorClient.save();
    await receiverClient.save();
  }

  const newTransaction = new Transaction({ value, receiver, donor });

  await newTransaction.save();

  res.json({ message: 'Transação efetuada com sucesso.' });
});


router.get('/:id/debit', async (req: Request, res: Response) => {
  const { id } = req.params;

  const transactions = await Transaction.find({ donor: id }).populate('receiver', 'fullName');

  res.json(transactions);
});

router.get('/:id/credit', async (req: Request, res: Response) => {
  const { id } = req.params;

  const transactions = await Transaction.find({ receiver: id }).populate('donor', 'fullName');

  res.json(transactions);
});

export default router;
