import { z } from 'zod';

const registrationSchema = z.object({
    username: z.string({ required_error: "Username is required." })
        .min(6, { message: "Username must be at least 6 characters long." })
        .max(12, { message: "Username should not exceed 12 characters." }),
    email: z.string({ required_error: "Email address is required." })
        .email({ message: "Enter a valid email address." }),
    password: z.string({ required_error: "Password is required." })
        .min(6, { message: "Password must be at least 6 characters long." })
        .max(12, { message: "Password should not exceed 12 characters." }),
});

export const AuthValidations = {
    registrationSchema
}
