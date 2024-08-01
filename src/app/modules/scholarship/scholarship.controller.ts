import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ScholarshipService } from "./scholarship.service";


const createScholarship = catchAsync(async (req, res) => {
    const scholarship = await ScholarshipService.createScholarshipIntoDB(req.user, req.body);
    if (!scholarship) {
        sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: 'Scholarship not found',
            data: null,
        })
    }
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Scholarship created successfully',
        data: scholarship,
    })
});

const getAllScholarships = catchAsync(async (req, res) => {
    const scholarships = await ScholarshipService.getAllScholarshipsFromDB();
    if (!scholarships) {
        sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: 'Scholarship not found',
            data: null,
        })
    }
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Scholarships fetched successfully',
        data: scholarships,
    })
});

const getSingleScholarship = catchAsync(async (req, res) => {
    const scholarship = await ScholarshipService.getScholarshipByIdFromDB(req.params.id);
    if (!scholarship) {
        sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: 'Scholarship not found',
            data: null,
        })
    }
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Scholarship fetched successfully',
        data: scholarship,
    })
});

const updateScholarship = catchAsync(async (req, res) => {
    const scholarship = await ScholarshipService.updateScholarshipIntoDB(req.params.id, req.body);
    if (!scholarship) {
        sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: 'Scholarship not found',
            data: null,
        })
    }
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Scholarship updated successfully',
        data: scholarship,
    })
});


const deleteScholarship = catchAsync(async (req, res) => {
    const scholarship = await ScholarshipService.deleteScholarshipFromDB(req.params.id);
    if (!scholarship) {
        sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: 'Scholarship not found',
            data: null,
        })
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Scholarship deleted successfully',
        data: scholarship,
    })
})

export const ScholarshipController = {
    createScholarship,
    getAllScholarships,
    getSingleScholarship,
    updateScholarship,
    deleteScholarship,
}