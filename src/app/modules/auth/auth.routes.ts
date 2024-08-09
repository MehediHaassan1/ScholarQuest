import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthValidations } from "./auth.validation";
import validateRequestHandler from "../../middlewares/validateRequestHandler";

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

export const AuthRoutes = router;