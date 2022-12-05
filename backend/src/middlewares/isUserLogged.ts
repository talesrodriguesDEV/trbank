import jwt from '../utils/jwt';
import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces/IRequest';

const isUserLogged = (req: IRequest, _res: Response, next: NextFunction) => {
  const token = req.header('Authorization') || '';

  try {
    jwt.verifyToken(token);
  } catch (err) {
    req.status = 400;
    throw err;
  }

  return next();
}

export default isUserLogged;
