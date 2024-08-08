import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

const validateRequestHandler = (schema: AnyZodObject) => {
    return catchAsync(
        async (req, res, next) => {
            const validateData = await schema.parseAsync(req.body)
            req.body = validateData;
            next();
        }
    )
}

export default validateRequestHandler;