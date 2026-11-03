import { app } from './app';
import { conectarBaseDatos } from './config/database';
import { config } from './config/env';

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error('Configura JWT_SECRET con al menos 32 caracteres en server/.env');
}

const PORT: number = config.port;

const startServer = async () => {
    try {
        await conectarBaseDatos()
        console.log("Conectado exitosamente a MongoDB")
        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en el puerto: ${PORT}`);
        });
    } catch (error) {
        console.error("Error crítico al arrancar la aplicación:", error)
        process.exit(1)
    }
}

startServer()
