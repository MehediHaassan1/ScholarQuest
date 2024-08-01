import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { SubCategoryRoutes } from "../modules/subCategory/subCategory.route";
import { ScholarshipRoutes } from "../modules/scholarship/scholarship.route";
import { CategoryRoutes } from "../modules/category/category.route";

const router = Router();

router.use('/user', UserRoutes);

router.use('/auth', AuthRoutes)

router.use('/category', CategoryRoutes)

router.use('/sub-category', SubCategoryRoutes)

router.use('/scholarship', ScholarshipRoutes)

export default router;