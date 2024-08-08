import { TRegister } from "./auth.interface"
import UserRegistration from "./auth.model"

const registerUserIntoDB = async (payload: TRegister) => {
    const result = await UserRegistration.create(payload);
    return result;
}

export const AuthServices = {
    registerUserIntoDB,
}