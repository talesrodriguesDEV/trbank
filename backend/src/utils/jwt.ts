import jwt from 'jsonwebtoken';

const generateToken = (cpf: string) => jwt.sign({ cpf }, 'segredo_jwt');

const verifyToken = (token: string) => jwt.verify(token, 'segredo_jwt');

export default {
  generateToken,
  verifyToken,
}
