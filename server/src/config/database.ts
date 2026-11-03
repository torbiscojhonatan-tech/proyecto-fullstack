import mongoose from 'mongoose'
import { config } from './env'

export const conectarBaseDatos = async (): Promise<void> => {
    await mongoose.connect(config.db.uri)
}
