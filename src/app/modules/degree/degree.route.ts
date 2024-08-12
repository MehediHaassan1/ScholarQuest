import { Router } from 'express';
import { DegreeController } from './degree.controller';
import authHandler from '../../middlewares/authHandler';
import { USER_ROLE } from '../user/user.constant';
import validateRequestHandler from '../../middlewares/validateRequestHandler';
import { DegreeValidation } from './degree.validation';

const router = Router();

router.post(
    '/',
    authHandler(USER_ROLE.ADMIN),
    validateRequestHandler(DegreeValidation.createDegreeValidationSchema),
    DegreeController.createDegree
);

router.get(
    '/',
    authHandler(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
    DegreeController.getAllDegrees
);

router.get(
    '/:id',
    authHandler(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
    DegreeController.getDegreeById
);
router.patch(
    '/:id',
    authHandler(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
    DegreeController.updateDegree
);

export const DegreeRoutes = router;
