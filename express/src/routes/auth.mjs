import { Router } from "express";

import { validateUserLogIn, validateUserRegistration } from "../middlewares/validationMiddleware.mjs";
import { register, signIn } from "../controllers/user.mjs";
import { sendVerificationEmailHandler } from "../controllers/email.mjs";
import { handleOAuthUser } from "../controllers/auth.mjs";

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

router.post('/auth/oauth', async (req, res) => {
  const { email, username, provider, providerUserId } = req.body;

  try {
    const { msg } = await handleOAuthUser(req, res);
    res.status(201).send({ msg: "OAuth user registered successfully" });
  } catch (err) {
    res.status(500).send({ msg: "OAuth user register failed" });
  }
});

router.post('/auth/login', validateUserLogIn, async (req, res) => {
  try {
    const { msg } = await signIn(req, res);
    res.status(200).send({ msg: "Login successful" });
  } catch (err) {
    if (err.message === 'INVALID_USER') {
      return res.status(400).send({ msg: "Invalid email or password" });
    }
    res.status(500).send({ msg: "Login failed" });
  }
});

export default router;