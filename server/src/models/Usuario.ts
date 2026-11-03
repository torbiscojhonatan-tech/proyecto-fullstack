import { Schema, model } from 'mongoose';
export interface IUsuario { nombre: string; correo: string; passwordHash: string }
const usuarioSchema = new Schema<IUsuario>({
  nombre: { type: String, required: true, trim: true },
  correo: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false }
}, { timestamps: true });
export const Usuario = model<IUsuario>('Usuario', usuarioSchema);
