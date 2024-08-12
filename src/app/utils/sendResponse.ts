import { Response } from "express";

type TResponse<T> = {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    return res.json({
        statusCode: data?.statusCode,
        success: data?.success,
        message: data?.message,
        data: data?.data,
    })
}

export default sendResponse;