import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLogin, TRegister } from "./auth.interface"
import UserRegistration from "./auth.model"
import { createToken } from "./auth.utils";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcrypt';

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

const loginUserIntoDB = async (payload: TLogin) => {
    // check the user is exists or not.
    const userExists = await UserRegistration.findOne({ email: payload.email });
    if (!userExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // check the user is deleted or not
    const isDeleted = userExists?.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'User not exists');
    }

    // check the user is deleted or not
    const status = userExists?.status;
    if (status === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'User not exists');
    }

    // check the password is correct or not
    if (!(await UserRegistration.isPasswordMatched(payload?.password, userExists?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    // create access token and refresh token!
    const jwtPayload = {
        user: userExists?.email,
        role: userExists.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string,
    );

    return {
        accessToken,
        refreshToken
    }
}

const changePasswordFromDB = async (
    userData: JwtPayload,
    payload: { oldPassword: string; newPassword: string },
) => {
    // checking if the user is exist
    const user = await UserRegistration.findOne({ email: userData.user });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the user is blocked

    const userStatus = user?.status;

    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    //checking if the password is correct

    if (!(await UserRegistration.isPasswordMatched(payload.oldPassword, user?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    //hash new password
    const newHashedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.saltRounds),
    );

    await UserRegistration.findOneAndUpdate(
        {
            email: userData.user,
            role: userData.role,
        },
        {
            password: newHashedPassword,
        },
    );

    return null;
};

export const AuthServices = {
    registerUserIntoDB,
    loginUserIntoDB,
    changePasswordFromDB,
}