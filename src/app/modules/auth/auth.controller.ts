import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import config from "../../config";

const registerUser = catchAsync(async (req, res) => {
    const registerUserInfo = req.body;
    const result = await AuthServices.registerUserIntoDB(registerUserInfo)

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "User registered successfully",
        data: result,
    })
})

const loginUser = catchAsync(async (req, res) => {
    const loginInfo = req.body;
    console.log(loginInfo)
    const result = await AuthServices.loginUserIntoDB(loginInfo);

    const { refreshToken, accessToken } = result;

    res.cookie('refresh-token', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: { accessToken },
    })
})

const changePassword = catchAsync(async(req, res) => {
    const userData = req.user;
    const passwordData = req.body;
    const result = await AuthServices.changePasswordFromDB(userData, passwordData)
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "Password change successfully",
        data: result,
    })
})

export const AuthController = {
    registerUser,
    loginUser,
    changePassword,
}