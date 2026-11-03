import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface RequestAutenticada extends Request { usuarioId?: string }
export const autenticar = (req: RequestAutenticada, res: Response, next: NextFunction): void => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
  if (!token) { res.status(401).json({ success: false, error: 'Token requerido' }); return; }
  try {
    const datos = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload;
    if (typeof datos.sub !== 'string') throw new Error('Token inválido');
    req.usuarioId = datos.sub;
    next();
  } catch {
    res.status(401).json({ success: false, error: 'Token inválido o vencido' });
  }
};
