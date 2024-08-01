import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TSubCategory } from "./subCategory.interface";
import SubCategory from "./subCategory.model";

const createSubCategoryIntoDB = async (subCategoryData: TSubCategory) => {
    const subCategoryExists = await SubCategory.findOne({ name: subCategoryData.name })
    if (subCategoryExists) {
        throw new AppError(httpStatus.CONFLICT, 'Sub Category already exists')
    }

    const subCategory = await SubCategory.create(subCategoryData);
    return subCategory;
};

const getAllSubCategoriesFromDB = async () => {
    const SubCategories = await SubCategory.find().populate('category');
    return SubCategories;
};

const getSubCategoryByIdFromDB = async (id: string) => {
    const subCategory = await SubCategory.findById(id).populate('category');
    if (!subCategory) {
        throw new AppError(httpStatus.NOT_FOUND, 'Sub Category not found');
    }
    return subCategory;
};

const updateSubCategoryIntoDB = async (id: string, SubCategoryData: Partial<TSubCategory>) => {
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
        id,
        SubCategoryData,
        { new: true, runValidators: true }
    );

    if (!updatedSubCategory) {
        throw new AppError(httpStatus.NOT_FOUND, 'Sub Category not found');
    }

    return updatedSubCategory;
};

export const SubCategoryService = {
    createSubCategoryIntoDB,
    getAllSubCategoriesFromDB,
    getSubCategoryByIdFromDB,
    updateSubCategoryIntoDB,
}