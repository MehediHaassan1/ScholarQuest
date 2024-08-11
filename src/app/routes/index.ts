import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";

const router = Router();

router.use('/user', UserRoutes);

router.use('/auth', AuthRoutes)

export default router;