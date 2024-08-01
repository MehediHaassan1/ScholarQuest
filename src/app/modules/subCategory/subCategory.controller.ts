import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SubCategoryService } from './subCategory.service';

const createSubCategory = catchAsync(async (req, res) => {
    const subCategory = await SubCategoryService.createSubCategoryIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Sub category created successfully',
        data: subCategory,
    })
});

const getAllSubCategories = catchAsync(async (req, res) => {
    const subCategories = await SubCategoryService.getAllSubCategoriesFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Sub categories fetched successfully',
        data: subCategories,
    })
});

const getSubCategoryById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const subCategory = await SubCategoryService.getSubCategoryByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Sub category fetched successfully',
        data: subCategory,
    })
});

const updateSubCategory = catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedSubCategory = await SubCategoryService.updateSubCategoryIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Sub category updated successfully',
        data: updatedSubCategory,
    })
});


export const SubCategoryController = {
    createSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    updateSubCategory,
}