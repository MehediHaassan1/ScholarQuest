import { Router } from "express";
import authHandler from "../../middlewares/authHandler";
import { USER_ROLE } from "../user/user.constant";
import validateRequestHandler from "../../middlewares/validateRequestHandler";
import { SubjectCategoryValidation } from "./subjectCategory.validation";
import { SubjectCategoryController } from "./subjectCategory.controller";

const router = Router();

router.post(
    '/',
    authHandler(USER_ROLE.ADMIN),
    validateRequestHandler(SubjectCategoryValidation),
    SubjectCategoryController.createSubjectCategory
)

router.get(
    '/',
    authHandler(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
    SubjectCategoryController.getAllSubjectCategories
)

router.get(
    '/:id',
    authHandler(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
    SubjectCategoryController.getSingleSubjectCategory
)

router.patch(
    '/:id',
    authHandler(USER_ROLE.ADMIN),
    validateRequestHandler(SubjectCategoryValidation),
    SubjectCategoryController.updateSubjectCategory
)


export const SubjectCategoryRoutes = router;