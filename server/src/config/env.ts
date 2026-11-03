import dotenv from 'dotenv'
dotenv.config()

export const config = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    db: {
        uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/barberia'
    }
}
