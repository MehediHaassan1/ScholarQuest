import { Router } from "express";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import authHandler from "../../middlewares/authHandler";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = Router();

router.put(
    '/update-profile-data',
    authHandler('user', 'admin'),
    validateRequestHandler(UserValidation.updateUserProfileSchema),
    UserController.updateUserProfile
)

router.patch(
    '/update-user-role/:id',
    authHandler('admin'),
    UserController.updateUserRole
)


export const UserRoutes = router;