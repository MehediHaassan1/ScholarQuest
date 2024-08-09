import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthValidations } from "./auth.validation";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import authHandler from "../../middlewares/authHandler";

const router = Router();

router.post(
    '/register',
    validateRequestHandler(AuthValidations.registrationValidationSchema),
    AuthController.registerUser
);

router.post(
    '/login',
    validateRequestHandler(AuthValidations.loginValidationSchema),
    AuthController.loginUser
)

router.patch(
    '/change-password',
    authHandler('user'),
    AuthController.changePassword
)

export const AuthRoutes = router;