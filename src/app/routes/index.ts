import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { SubjectCategoryRoutes } from "../modules/subjectCategory/createSubjectCategory.route";

const router = Router();

router.use('/user', UserRoutes);

router.use('/auth', AuthRoutes)

router.use('/subject-category', SubjectCategoryRoutes)

export default router;