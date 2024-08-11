import { Router } from "express";
import { AuthValidation } from "./auth.validation";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import { AuthController } from "./auth.controller";
import authHandler from "../../middlewares/authHandler";

const router = Router();

router.post(
    '/register',
    validateRequestHandler(AuthValidation.registrationValidationSchema),
    AuthController.registerUser
);

router.post(
    '/login',
    validateRequestHandler(AuthValidation.loginValidationSchema),
    AuthController.loginUser
)

router.patch(
    '/change-password',
    authHandler('user', 'admin'),
    AuthController.changePassword
)


router.get(
    '/profile',
    authHandler('user', 'moderator', 'admin'),
    AuthController.getUserData
)

export const AuthRoutes = router;