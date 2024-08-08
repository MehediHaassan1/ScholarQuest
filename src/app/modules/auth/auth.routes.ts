import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthValidations } from "./auth.validation";
import validateRequestHandler from "../../middlewares/validateRequestHandler";

const router = Router();

router.post(
    '/register',
    validateRequestHandler(AuthValidations.registrationSchema),
    AuthController.registerUser
)

export const AuthRoutes = router;