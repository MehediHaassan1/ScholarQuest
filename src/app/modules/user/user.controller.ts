import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import config from "../../config";
import { UserServices } from "./user.service";

const registerUser = catchAsync(async (req, res) => {
    const registerUserInfo = req.body;
    const result = await UserServices.registerUserIntoDB(registerUserInfo)

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "User registered successfully",
        data: result,
    })
})

const loginUser = catchAsync(async (req, res) => {
    const loginInfo = req.body;
    const result = await UserServices.loginUserIntoDB(loginInfo);

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

const changePassword = catchAsync(async (req, res) => {
    const userData = req.user;
    const passwordData = req.body;
    const result = await UserServices.changePasswordFromDB(userData, passwordData)
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "Password change successfully",
        data: result,
    })
})

const updateUserProfile = catchAsync(async (req, res) => {
    const userData = req.user;
    const profileData = req.body;
    const result = await UserServices.updateUserProfileIntoDB(userData, profileData);
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "Profile updated successfully",
        data: result,
    })
})

const updateUserRole = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await UserServices.updateUserRoleIntoDB(id);
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "User role updated successfully",
        data: result,
    })
})

export const UserController = {
    registerUser,
    loginUser,
    changePassword,
    updateUserRole,
    updateUserProfile,
}