import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/Usuario';
const tokenPara = (id: string) => jwt.sign({}, process.env.JWT_SECRET!, { subject: id, expiresIn: '2h' });

export const registrar = async (req: Request, res: Response): Promise<void> => {
  const nombre = String(req.body?.nombre || '').trim();
  const correo = String(req.body?.correo || '').trim().toLowerCase();
  const password = String(req.body?.password || '');
  if (nombre.length < 2 || !/^\S+@\S+\.\S+$/.test(correo) || password.length < 6) {
    res.status(400).json({ success: false, error: 'Ingresa nombre, correo válido y contraseña de 6 caracteres como mínimo' }); return;
  }
  if (await Usuario.exists({ correo })) { res.status(400).json({ success: false, error: 'Ese correo ya está registrado' }); return; }
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const usuario = await Usuario.create({ nombre, correo, passwordHash });
    res.status(201).json({ success: true, data: { token: tokenPara(usuario.id), nombre: usuario.nombre } });
  } catch (error: any) {
    if (error?.code === 11000) { res.status(400).json({ success: false, error: 'Ese correo ya está registrado' }); return; }
    throw error;
  }
};
export const iniciarSesion = async (req: Request, res: Response): Promise<void> => {
  const correo = String(req.body?.correo || '').trim().toLowerCase();
  const password = String(req.body?.password || '');
  const usuario = await Usuario.findOne({ correo }).select('+passwordHash');
  if (!usuario || !(await bcrypt.compare(password, usuario.passwordHash))) {
    res.status(401).json({ success: false, error: 'Credenciales incorrectas' }); return;
  }
  res.json({ success: true, data: { token: tokenPara(usuario.id), nombre: usuario.nombre } });
};
