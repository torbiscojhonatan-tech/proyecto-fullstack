import { Request, Response, NextFunction } from "express"

export interface ErrorConStatus extends Error {
    statusCode?: number
    errors?: Record<string, { message: string }>
}

export const errorHandler = (
    err: ErrorConStatus,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(`[Error] ${err.message}`)

    let status = err.statusCode || 500
    let mensaje = err.message || 'Error interno del servidor'

    // Errores de validación de Mongoose (campos obligatorios, mínimos, máximos...)
    if (err.name === 'ValidationError' && err.errors) {
        status = 400
        mensaje = Object.values(err.errors).map(e => e.message).join(', ')
    }
    // ID con formato inválido
    else if (err.name === 'CastError') {
        status = 400
        mensaje = 'ID inválido'
    }

    res.status(status).json({
        success: false,
        error: mensaje
    })
}
