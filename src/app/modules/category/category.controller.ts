import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryService } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
    const result = await CategoryService.createCategoryIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category created successfully',
        data: result
    })
})

const getAllCategories = catchAsync(async (req, res) => {
    const result = await CategoryService.getAllCategoriesFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Categories fetched successfully',
        data: result
    })
})

const getSingleCategory = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await CategoryService.getSingleCategoryFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category fetched successfully',
        data: result
    })
})

const updateCategory = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await CategoryService.updateCategoryIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subject category updated successfully',
        data: result
    })
})

export const CategoryController = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
}