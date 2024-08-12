import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DegreeService } from './degree.service';

const createDegree = catchAsync(async (req, res) => {
    const degree = await DegreeService.createDegreeIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Degree created successfully',
        data: degree,
    })
});

const getAllDegrees = catchAsync(async (req, res) => {
    const degrees = await DegreeService.getAllDegreesFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Degrees fetched successfully',
        data: degrees,
    })
});

const getDegreeById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const degree = await DegreeService.getDegreeByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Degree fetched successfully',
        data: degree,
    })
});

const updateDegree = catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedDegree = await DegreeService.updateDegreeIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Degree updated successfully',
        data: updatedDegree,
    })
});


export const DegreeController = {
    createDegree,
    getAllDegrees,
    getDegreeById,
    updateDegree,
}