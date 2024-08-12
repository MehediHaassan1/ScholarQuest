import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TSubjectCategory } from "./subjectCategory.interface";
import SubjectCategory from "./subjectCategory.model";

const createSubjectCategoryIntoDB = async (payload: TSubjectCategory) => {
    // check the subject category is already in db or not
    const subjectCategoryExists = await SubjectCategory.findOne({ name: payload.name });
    if (subjectCategoryExists) {
        throw new AppError(httpStatus.CONFLICT, 'Subject category already exists');
    }

    const result = await SubjectCategory.create(payload);
    return result;
}

const getAllSubjectCategoriesFromDB = async () => {
    const result = await SubjectCategory.find();
    return result;
};

const getSingleSubjectCategoryFromDB = async (id: string) => {
    const subjectCategory = await SubjectCategory.findById(id);
    if (!subjectCategory) {
        throw new AppError(httpStatus.NOT_FOUND, 'Subject category not found');
    }
    return subjectCategory;
};

const updateSubjectCategoryIntoDB = async (id: string, payload: TSubjectCategory) => {
    const subjectCategory = await SubjectCategory.findById(id);
    if (!subjectCategory) {
        throw new AppError(httpStatus.NOT_FOUND, 'Subject category not found');
    }

   const result = await SubjectCategory.findByIdAndUpdate(id, payload, { new: true })
    return result;
}

export const SubjectCategoryService = {
    createSubjectCategoryIntoDB,
    getAllSubjectCategoriesFromDB,
    getSingleSubjectCategoryFromDB,
    updateSubjectCategoryIntoDB,
}

