import { z } from 'zod';
import { Types } from 'mongoose';

const createScholarshipValidation = z.object({
    scholarshipName: z.string({
        required_error: 'Scholarship Name is required',
    }).min(20).max(100),
    scholarshipDescription: z.string({
        required_error: 'Scholarship Description is required',
    }).min(250).max(1000),
    universityName: z.string({
        required_error: 'University Name is required',
    }).min(10).max(100),
    universityImage: z.string({
        required_error: 'University Image is required',
    }),
    universityCountry: z.string({
        required_error: 'University Country is required',
    }).min(1).max(100),
    universityCity: z.string({
        required_error: 'University City is required',
    }).min(1).max(100),
    universityWorldRank: z.number({
        required_error: 'University World Rank is required',
    }).min(1),
    scholarshipCategory: z.enum(['Merit', 'Need', 'Research'], {
        required_error: 'Scholarship Category is required',
    }),
    category: z.string({
        required_error: 'Category is required',
    }).refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid ObjectId for category',
    }),
    subCategory: z.string({
        required_error: 'Subcategory is required',
    }).refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid ObjectId for subCategory',
    }),
    degree: z.enum(['Bachelor', 'Master', 'Doctor of Philosophy'], {
        required_error: 'Degree is required',
    }),
    tuitionFees: z.number({
        required_error: 'Tuition Fees are required',
    }).min(1000),
    applicationFees: z.number({
        required_error: 'Application Fees are required',
    }).min(50),
    serviceCharge: z.number({
        required_error: 'Service Charge is required',
    }).min(10),
    applicationDeadline: z.string({
        required_error: 'Application Deadline is required',
    }),
});


const updateScholarshipValidation = z.object({
    scholarshipName: z.string()
        .min(20)
        .max(100)
        .optional(),
    scholarshipDescription: z.string()
        .min(250)
        .max(1000)
        .optional(),
    universityName: z.string()
        .min(10)
        .max(100)
        .optional(),
    universityImage: z.string()
        .optional(),
    universityCountry: z.string()
        .min(1)
        .max(100)
        .optional(),
    universityCity: z.string()
        .min(1)
        .max(100)
        .optional(),
    universityWorldRank: z.number()
        .min(1)
        .optional(),
    scholarshipCategory: z.enum(['Merit', 'Need', 'Research'])
        .optional(),
    category: z.string()
        .refine((val) => Types.ObjectId.isValid(val), {
            message: 'Invalid ObjectId for category',
        })
        .optional(),
    subCategory: z.string()
        .refine((val) => Types.ObjectId.isValid(val), {
            message: 'Invalid ObjectId for subCategory',
        })
        .optional(),
    degree: z.enum(['Bachelor', 'Master', 'Doctor of Philosophy'])
        .optional(),
    tuitionFees: z.number()
        .min(1000)
        .optional(),
    applicationFees: z.number()
        .min(50)
        .optional(),
    serviceCharge: z.number()
        .min(10)
        .optional(),
    applicationDeadline: z.string()
        .optional(),
});



export const ScholarshipValidation = {
    createScholarshipValidation,
    updateScholarshipValidation,
}