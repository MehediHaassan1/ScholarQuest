import { Types } from "mongoose";
import { TScholarship } from "./scholarship.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import User from "../user/user.model";
import SubCategory from "../subCategory/subCategory.model";
import { Scholarship } from "./scholarship.model";
import Category from "../category/category.model";

const createScholarshipIntoDB = async (user: JwtPayload, data: TScholarship) => {
    // find the user
    const isUserExists = await User.findOne({ email: user.user });
    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }
    const userName = `${isUserExists?.name?.firstName} ${isUserExists?.name?.middleName ? isUserExists?.name?.middleName + ' ' : ''}${isUserExists?.name?.lastName}`
    data.postedBy = userName

    const today = new Date();
    const formattedDate = today.getFullYear() + '-'
        + String(today.getMonth() + 1).padStart(2, '0') + '-'
        + String(today.getDate()).padStart(2, '0');

    data.postDate = formattedDate;

    // find category in db
    const isCategoryExists = await Category.findById(data.category)
    if (!isCategoryExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Category not found')
    }
    // find subCategory in db
    const isSubCategoryExists = await SubCategory.findById(data.subCategory)
    if (!isSubCategoryExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Sub Category not found')
    }

    const newScholarship = await Scholarship.create(data);
    return newScholarship;
}

const getAllScholarshipsFromDB = async () => {
    const scholarships = await Scholarship.find()
        .populate('subCategory')
        .populate('category');

    return scholarships;
}

const getScholarshipByIdFromDB = async (id: string) => {
    const scholarship = await Scholarship.findById(id)
        .populate('subCategory')
        .populate('category');

    if (!scholarship) {
        throw new AppError(httpStatus.NOT_FOUND, "Scholarship not found")
    }
    return scholarship;
}

const updateScholarshipIntoDB = async (id: string, data: Partial<TScholarship>) => {
    const scholarship = await Scholarship.findById(id)
    if (!scholarship) {
        throw new AppError(httpStatus.NOT_FOUND, "Scholarship not found")
    }
    const updatedData = await Scholarship.findByIdAndUpdate(id, data, { new: true });
    return updatedData;
}

const deleteScholarshipFromDB = async (id: string) => {
    const scholarship = await Scholarship.findById(id)
    if (!scholarship) {
        throw new AppError(httpStatus.NOT_FOUND, "Scholarship not found")
    }
    const result = await Scholarship.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true });

    return result;
}

export const ScholarshipService = {
    createScholarshipIntoDB,
    getAllScholarshipsFromDB,
    getScholarshipByIdFromDB,
    updateScholarshipIntoDB,
    deleteScholarshipFromDB,
}
