import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

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

export const AuthController = {
    registerUser,
}