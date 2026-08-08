import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
  sub: string;
  escolaId: number;
  role: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const secret = process.env.JWT_SECRET || 'default_secret';
    const decoded = jwt.verify(token, secret) as IPayload;

    // Injeta as informações extraídas do Token na Requisição
    req.user = {
      id: Number(decoded.sub),
      escolaId: decoded.escolaId,
      role: decoded.role,
    };

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
}