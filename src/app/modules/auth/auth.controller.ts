import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import config from "../../config";
import { AuthService } from "./auth.service";

const registerUser = catchAsync(async (req, res) => {
    const registerUserInfo = req.body;
    const result = await AuthService.registerUserIntoDB(registerUserInfo)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User registered successfully",
        data: result,
    })
})

const loginUser = catchAsync(async (req, res) => {
    const loginInfo = req.body;
    const result = await AuthService.loginUserIntoDB(loginInfo);

    const { refreshToken, accessToken } = result;

    res.cookie('refresh-token', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: { accessToken },
    })
})

const changePassword = catchAsync(async (req, res) => {
    const userData = req.user;
    const passwordData = req.body;
    const result = await AuthService.changePasswordFromDB(userData, passwordData)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password change successfully",
        data: result,
    })
})

const getUserData = catchAsync(async (req, res) => {
    const userData = req.user;
    const result = await AuthService.getUserDataFromDB(userData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile fetched successfully",
        data: result,
    })
})

export const AuthController = {
    registerUser,
    loginUser,
    changePassword,
    getUserData,
}