import { Schema, model } from 'mongoose'

// Tipo TypeScript que describe un servicio de la barbería
export interface IServicio {
    usuarioId: Schema.Types.ObjectId;
    nombre: string;
    categoria: string;
    precio: number;
    duracion: number; // minutos
    descripcion: string;
}

// Estructura de los documentos en MongoDB (con sus validaciones)
const servicioSchema = new Schema<IServicio>(
    {
        usuarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true, index: true },
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            trim: true,
            minlength: [3, 'El nombre debe tener al menos 3 caracteres']
        },
        categoria: {
            type: String,
            required: [true, 'La categoría es obligatoria'],
            trim: true
        },
        precio: {
            type: Number,
            required: [true, 'El precio es obligatorio'],
            min: [0, 'El precio no puede ser negativo']
        },
        duracion: {
            type: Number,
            required: [true, 'La duración es obligatoria'],
            min: [5, 'La duración mínima es 5 minutos'],
            max: [300, 'La duración máxima es 300 minutos']
        },
        descripcion: {
            type: String,
            default: '',
            trim: true,
            maxlength: [200, 'La descripción no puede superar 200 caracteres']
        }
    },
    { timestamps: true }
)

export const Servicio = model<IServicio>('Servicio', servicioSchema)
