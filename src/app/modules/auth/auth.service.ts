import config from "../../config";
import bcrypt from 'bcrypt';
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import User from "../user/user.model";
import { createToken } from "./auth.utils";
import { TLogin, TRegister } from "./auth.interface";


const registerUserIntoDB = async (payload: TRegister) => {
    // check the username is taken or not
    const userNameExists = await User.findOne({ userName: payload.userName });
    if (userNameExists) {
        throw new AppError(httpStatus.CONFLICT, 'Username already exists');
    }

    // check the email is taken or not
    const emailExists = await User.findOne({ email: payload.email });
    if (emailExists) {
        throw new AppError(httpStatus.CONFLICT, 'Email already exists');
    }

    const result = await User.create(payload);
    return result;
}

const loginUserIntoDB = async (payload: TLogin) => {
    // check the user is exists or not.
    const userExists = await User.findOne({ email: payload.email }).select('+password');
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
    if (!(await User.isPasswordMatched(payload?.password, userExists?.password)))
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
    const user = await User.findOne({ email: userData.user }).select('+password');

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

    if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    //hash new password
    const newHashedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.saltRounds),
    );

    await User.findOneAndUpdate(
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

const getUserDataFromDB = async (userData: JwtPayload) => {
    const user = await User.findOne({ email: userData?.user });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // check the user is deleted or not
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'User not exists');
    }

    // check the user is blocked or not
    const status = user?.status;
    if (status === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'User not exists');
    }

    return user;
}


export const AuthService = {
    registerUserIntoDB,
    loginUserIntoDB,
    changePasswordFromDB,
    getUserDataFromDB,
}