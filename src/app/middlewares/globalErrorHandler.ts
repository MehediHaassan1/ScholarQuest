import { NextFunction, Request, Response } from "express";
import config from "../config";

const globalErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    let status = error.status || 500;
    let message = error.message || 'Something went wrong';
    let errorSource = [
        {
            path: '',
            message: message,
        }
    ]

    return res.status(status).json({
        success: false,
        status,
        message,
        errorSource,
        error,
        stack: config.NODE_ENV === 'development' ? error.stack : null
    })
}

export default globalErrorHandler;