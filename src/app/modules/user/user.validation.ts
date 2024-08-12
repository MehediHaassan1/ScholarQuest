import { z } from 'zod';

const updateUserProfileSchema = z.object({
    name: z.object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
    }).optional(),
    dateOfBirth: z.string().optional(),
    nationality: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    phoneNumber: z.string().optional(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
    profileImg: z.string().optional(),
    presentAddress: z.object({
        street: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zipCode: z.string().optional(),
        country: z.string().optional(),
    }).optional(),
    permanentAddress: z.object({
        street: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zipCode: z.string().optional(),
        country: z.string().optional(),
    }).optional(),
});

const changeStatusValidation = z.object({
    status: z.enum(['active', 'block']),
})


export const UserValidation = {
    updateUserProfileSchema,
    changeStatusValidation,
}
