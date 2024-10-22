import { Router } from "express";

import { register } from "../controllers/userController.mjs";
import { sendVerificationEmailHandler } from "../controllers/emailController.mjs";
import { validateUserRegistration } from "../middlewares/validationMiddleware.mjs";

const router = Router();

router.post('/auth/register', validateUserRegistration, async (req, res) => {
  try {
    const { email, userId } = await register(req, res);
    await sendVerificationEmailHandler(email, userId);

    res.status(201).send({ msg: "Registration successful. Verification email sent." });
  } catch (err) {
    res.status(500).send({ msg: "Registration or email sending failed" });
  }
});

export default router;