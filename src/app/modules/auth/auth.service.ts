import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TRegister } from "./auth.interface"
import UserRegistration from "./auth.model"

const registerUserIntoDB = async (payload: TRegister) => {
    // check the username is taken or not
    const userNameExists = await UserRegistration.findOne({ username: payload.username });
    if (userNameExists) {
        throw new AppError(httpStatus.CONFLICT, 'Username already exists');
    }

    // check the email is taken or not
    const emailExists = await UserRegistration.findOne({ email: payload.email });
    if (emailExists) {
        throw new AppError(httpStatus.CONFLICT, 'Email already exists');
    }

    const result = await UserRegistration.create(payload);
    return result;
}

export const AuthServices = {
    registerUserIntoDB,
}