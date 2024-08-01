import { z } from 'zod';

export const CategoryValidation = z.object({
    name: z.string({ required_error: "Category is required" }).trim(),
});
