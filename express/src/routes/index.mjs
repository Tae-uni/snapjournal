import { Router } from "express";
import usersRouter from "./users.mjs";

const router = Router();

router.use(usersRouter);

export default router;