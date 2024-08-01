import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCategory } from "./category.interface";
import Category from "./category.model";


const createCategoryIntoDB = async (payload: TCategory) => {
    // check the Category is already in db or not
    const categoryExists = await Category.findOne({ name: payload.name });
    if (categoryExists) {
        throw new AppError(httpStatus.CONFLICT, 'Category already exists');
    }

    const result = await Category.create(payload);
    return result;
}

const getAllCategoriesFromDB = async () => {
    const result = await Category.find();
    return result;
};

const getSingleCategoryFromDB = async (id: string) => {
    const category = await Category.findById(id);
    if (!category) {
        throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
    }
    return category;
};

const updateCategoryIntoDB = async (id: string, payload: TCategory) => {
    const category = await Category.findById(id);
    if (!category) {
        throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
    }

    const result = await Category.findByIdAndUpdate(id, payload, { new: true })
    return result;
}

export const CategoryService = {
    createCategoryIntoDB,
    getAllCategoriesFromDB,
    getSingleCategoryFromDB,
    updateCategoryIntoDB,
}

