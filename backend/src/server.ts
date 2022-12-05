import mongoose from 'mongoose';

mongoose.connect('mongodb://mongo:27017', { user: 'root', pass: 'example' });
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

import express, { NextFunction, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import clientsRouter from './routes/client';
import transactionsRouter from './routes/transaction';
import loginRouter from './routes/login';
import { IRequest } from './interfaces/IRequest';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/clients', clientsRouter);
app.use('/transactions', transactionsRouter);
app.use('/login', loginRouter);
app.use((err: Error, req: IRequest, res: Response, _next: NextFunction) => res.status(req.status || 500).json({ message: err.message }));

app.listen(3001, () => console.log('Node server runnning on port 3001'));
