import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SubjectCategoryService } from "./subjectCategory.service";

const createSubjectCategory = catchAsync(async (req, res) => {
    const result = await SubjectCategoryService.createSubjectCategoryIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subject category created successfully',
        data: result
    })
})

const getAllSubjectCategories = catchAsync(async (req, res) => {
    const result = await SubjectCategoryService.getAllSubjectCategoriesFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subject categories fetched successfully',
        data: result
    })
})

const getSingleSubjectCategory = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await SubjectCategoryService.getSingleSubjectCategoryFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subject category fetched successfully',
        data: result
    })
})

const updateSubjectCategory = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await SubjectCategoryService.updateSubjectCategoryIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subject category updated successfully',
        data: result
    })
})

export const SubjectCategoryController = {
    createSubjectCategory,
    getAllSubjectCategories,
    getSingleSubjectCategory,
    updateSubjectCategory,
}