import { Router } from "express";
import authHandler from "../../middlewares/authHandler";
import { USER_ROLE } from "../user/user.constant";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import { CategoryValidation } from "./category.validation";
import { CategoryController } from "./category.controller";

const router = Router();

router.post(
    '/',
    authHandler(USER_ROLE.ADMIN),
    validateRequestHandler(CategoryValidation),
    CategoryController.createCategory
)

router.get(
    '/',
    authHandler(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
    CategoryController.getAllCategories
)

router.get(
    '/:id',
    authHandler(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
    CategoryController.getSingleCategory
)

router.patch(
    '/:id',
    authHandler(USER_ROLE.ADMIN),
    validateRequestHandler(CategoryValidation),
    CategoryController.updateCategory
)


export const CategoryRoutes = router;