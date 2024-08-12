import { Router } from "express";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import authHandler from "../../middlewares/authHandler";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import { USER_ROLE } from "./user.constant";

const router = Router();

router.get(
    '/',
    authHandler(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
    UserController.getAllUsers
)

router.get(
    '/:id',
    authHandler(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
    UserController.getSingleUser
)

router.delete(
    '/:id',
    authHandler(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
    UserController.deleteAUser
)

router.patch(
    '/change-status/:id',
    authHandler(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
    validateRequestHandler(UserValidation.changeStatusValidation),
    UserController.changeStatus
);

router.put(
    '/update-profile-data',
    authHandler(USER_ROLE.ADMIN, USER_ROLE.MODERATOR, USER_ROLE.USER),
    validateRequestHandler(UserValidation.updateUserProfileSchema),
    UserController.updateUserProfile
)

router.patch(
    '/update-user-role/:id',
    authHandler(USER_ROLE.ADMIN),
    UserController.updateUserRole
)


export const UserRoutes = router;