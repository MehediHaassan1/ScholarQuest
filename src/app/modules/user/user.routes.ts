import { Router } from "express";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import authHandler from "../../middlewares/authHandler";
import { UserController } from "./user.controller";
import { UserValidations } from "./user.validation";

const router = Router();

router.post(
    '/register',
    validateRequestHandler(UserValidations.registrationValidationSchema),
    UserController.registerUser
);

router.post(
    '/login',
    validateRequestHandler(UserValidations.loginValidationSchema),
    UserController.loginUser
)

router.patch(
    '/change-password',
    authHandler('user', 'admin'),
    UserController.changePassword
)

router.put(
    '/update-profile-data',
    authHandler('user', 'admin'),
    validateRequestHandler(UserValidations.updateUserProfileSchema),
    UserController.updateUserProfile
)

router.patch(
    '/update-user-role/:id',
    authHandler('admin'),
    UserController.updateUserRole
)

router.get(
    '/profile',
    authHandler('user', 'moderator', 'admin'),
    UserController.getUserData
)

export const UserRoutes = router;