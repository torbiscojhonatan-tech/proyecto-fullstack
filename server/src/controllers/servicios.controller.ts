import { Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { Servicio } from '../models/Servicio';
import { RequestAutenticada } from '../middlewares/auth';

export const listarServicios = async (req: RequestAutenticada, res: Response) => {
  const data = await Servicio.find({ usuarioId: req.usuarioId }).sort({ createdAt: -1 });
  res.json({ success: true, data });
};
export const crearServicio = async (req: RequestAutenticada, res: Response) => {
  const { nombre, categoria, precio, duracion, descripcion } = req.body || {};
  const data = await Servicio.create({ nombre, categoria, precio, duracion, descripcion, usuarioId: req.usuarioId });
  res.status(201).json({ success: true, data });
};
export const actualizarServicio = async (req: RequestAutenticada, res: Response): Promise<void> => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) { res.status(400).json({ success: false, error: 'ID inválido' }); return; }
  const { nombre, categoria, precio, duracion, descripcion } = req.body || {};
  const data = await Servicio.findOneAndUpdate({ _id: id, usuarioId: req.usuarioId },
    { nombre, categoria, precio, duracion, descripcion }, { new: true, runValidators: true });
  if (!data) { res.status(404).json({ success: false, error: 'Servicio no encontrado' }); return; }
  res.json({ success: true, data });
};
export const eliminarServicio = async (req: RequestAutenticada, res: Response): Promise<void> => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) { res.status(400).json({ success: false, error: 'ID inválido' }); return; }
  const data = await Servicio.findOneAndDelete({ _id: id, usuarioId: req.usuarioId });
  if (!data) { res.status(404).json({ success: false, error: 'Servicio no encontrado' }); return; }
  res.json({ success: true, message: 'Servicio eliminado' });
};
