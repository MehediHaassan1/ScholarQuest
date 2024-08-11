import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import config from "../../config";
import { UserService } from "./user.service";



const updateUserProfile = catchAsync(async (req, res) => {
    const userData = req.user;
    const profileData = req.body;
    const result = await UserService.updateUserProfileIntoDB(userData, profileData);
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "Profile updated successfully",
        data: result,
    })
})

const updateUserRole = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await UserService.updateUserRoleIntoDB(id);
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "User role updated successfully",
        data: result,
    })
})



export const UserController = {
    updateUserRole,
    updateUserProfile,
}