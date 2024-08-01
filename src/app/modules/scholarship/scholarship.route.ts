import { Router } from 'express';
import authHandler from '../../middlewares/authHandler';
import { USER_ROLE } from '../user/user.constant';
import validateRequestHandler from '../../middlewares/validateRequestHandler';
import { ScholarshipValidation } from './scholarship.validation';
import { ScholarshipController } from './scholarship.controller';


const router = Router();

router.post(
    '/',
    authHandler(USER_ROLE.ADMIN),
    validateRequestHandler(ScholarshipValidation.createScholarshipValidation),
    ScholarshipController.createScholarship
);

router.get(
    '/',
    authHandler(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
    ScholarshipController.getAllScholarships
);
router.get(
    '/:id',
    authHandler(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
    ScholarshipController.getSingleScholarship
);
router.patch(
    '/:id',
    authHandler(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
    validateRequestHandler(ScholarshipValidation.updateScholarshipValidation),
    ScholarshipController.updateScholarship
);
router.delete(
    '/:id',
    authHandler(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
    ScholarshipController.deleteScholarship
);

export const ScholarshipRoutes = router;
