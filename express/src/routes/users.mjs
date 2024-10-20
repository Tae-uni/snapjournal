import { Router } from "express";

import { register } from "../controllers/userController.mjs";
import { validateUserRegistration } from "../middlewares/validationMiddleware.mjs";

const router = Router();

router.post('/auth/register', validateUserRegistration, register);

export default router;