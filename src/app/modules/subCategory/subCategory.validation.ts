import { z } from 'zod';
import { Types } from 'mongoose';

const createSubCategoryValidationSchema = z.object({
    name: z.string({ required_error: "Sub Category is required" }).trim().min(1).max(100),
    category: z.string({ required_error: "Category is required" }).refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid subject category ID',
    }),
});


export const SubCategoryValidation = {
    createSubCategoryValidationSchema,
}