import { z } from 'zod';

export const SubjectCategoryValidation = z.object({
    name: z.string({ required_error: "Subject Name is required" }).trim(),
});
