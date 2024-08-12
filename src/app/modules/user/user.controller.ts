import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import config from "../../config";
import { UserService } from "./user.service";


const getAllUsers = catchAsync(async (req, res) => {
    const result = await UserService.getAllUsersFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users fetched successfully",
        data: result,
    })
})


const getSingleUser = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await UserService.getSingleUsersFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users fetched successfully",
        data: result,
    })
})

const deleteAUser = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await UserService.deleteAUserFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User deleted successfully",
        data: result,
    })
})

const changeStatus = catchAsync(async (req, res) => {
    const id = req.params.id;

    const result = await UserService.changeStatusIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Status is updated successfully',
        data: result,
    });
});

const updateUserProfile = catchAsync(async (req, res) => {
    const userData = req.user;
    const profileData = req.body;
    const result = await UserService.updateUserProfileIntoDB(userData, profileData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Profile updated successfully",
        data: result,
    })
})

const updateUserRole = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await UserService.updateUserRoleIntoDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User role updated successfully",
        data: result,
    })
})




export const UserController = {
    getAllUsers,
    getSingleUser,
    deleteAUser,
    changeStatus,
    updateUserRole,
    updateUserProfile,
}