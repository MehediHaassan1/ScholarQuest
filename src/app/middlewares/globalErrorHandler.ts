import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status).json({
        status: error?.status,
        message: error?.message,
    })
}

export default globalErrorHandler;