import { Router } from 'express';
import authHandler from '../../middlewares/authHandler';
import { USER_ROLE } from '../user/user.constant';
import validateRequestHandler from '../../middlewares/validateRequestHandler';
import { SubCategoryValidation } from './subCategory.validation';
import { SubCategoryController } from './subCategory.controller';

const router = Router();

router.post(
    '/',
    authHandler(USER_ROLE.ADMIN),
    validateRequestHandler(SubCategoryValidation.createSubCategoryValidationSchema),
    SubCategoryController.createSubCategory
);

router.get(
    '/',
    authHandler(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
    SubCategoryController.getAllSubCategories
);

router.get(
    '/:id',
    authHandler(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
    SubCategoryController.getSubCategoryById
);
router.patch(
    '/:id',
    authHandler(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
    SubCategoryController.updateSubCategory
);

export const SubCategoryRoutes = router;
