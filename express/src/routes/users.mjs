import { Router } from "express";

import { register } from "../controllers/userController.mjs";

const router = Router();

router.post('/api/auth/register', register);

export default router;