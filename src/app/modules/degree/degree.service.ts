import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TDegree } from "./degree.interface";
import Degree from "./degree.model";

const createDegreeIntoDB = async (degreeData: TDegree) => {
    const degreeExists = await Degree.findOne({ name: degreeData.name })
    if (degreeExists) {
        throw new AppError(httpStatus.CONFLICT, 'Degree already exists')
    }

    const degree = await Degree.create(degreeData);
    return degree;
};

const getAllDegreesFromDB = async () => {
    const degrees = await Degree.find().populate('subjectCategory');
    return degrees;
};

const getDegreeByIdFromDB = async (id: string) => {
    const degree = await Degree.findById(id).populate('subjectCategory');
    if (!degree) {
        throw new AppError(httpStatus.NOT_FOUND, 'Degree not found');
    }
    return degree;
};

const updateDegreeIntoDB = async (id: string, degreeData: Partial<TDegree>) => {
    const updatedDegree = await Degree.findByIdAndUpdate(id, degreeData, { new: true, runValidators: true });
    if (!updatedDegree) {
        throw new Error('Degree not found');
    }
    return updatedDegree;
};

export const DegreeService = {
    createDegreeIntoDB,
    getAllDegreesFromDB,
    getDegreeByIdFromDB,
    updateDegreeIntoDB,
}