import { z } from 'zod';
import { Types } from 'mongoose';

const createDegreeValidationSchema = z.object({
    name: z.string().trim().min(1, 'Name is required').max(100),
    subjectCategory: z.string().refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid subject category ID',
    }),
});


export const DegreeValidation = {
    createDegreeValidationSchema,
}