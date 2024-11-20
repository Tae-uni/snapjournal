import { Router } from "express";

import { validateUserLogIn, validateUserRegistration } from "../middlewares/validationMiddleware.mjs";
import { authenticateToken } from "../middlewares/authenticateToken.mjs";

import { resendVerificationEmailHandler, sendVerificationEmailHandler, verifyEmail } from "../controllers/email.mjs";
import { register, signIn } from "../controllers/user.mjs";
import { handleOAuthUser } from "../controllers/auth.mjs";

const router = Router();

router.post('/auth/register', validateUserRegistration, async (req, res) => {
  try {
    const { email, userId, registrationAccessToken } = await register(req, res);
    await sendVerificationEmailHandler(email, userId);

    res.status(201).send({
      code: "REGISTRATION_SUCCESS",
      registrationAccessToken,
    });
  } catch (err) {
    if (err.message === "EMAIL_EXIST") {
      return res.status(400).send({ code: "EMAIL_EXIST" });
    }
    res.status(500).send({ code: "REGISTRATION_ERROR" });
  }
});

// router.get('/confirmation/message', authenticateToken, async (req, res) => {
//   res.status(200).send({ msg: "Grantee" });
// })

router.post('/auth/resend-verification', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    await resendVerificationEmailHandler(userId);
    res.status(200).send({ msg: "Verification email resent successfully." });
  } catch (err) {
    if (err.message === "USER_NOT_FOUND") {
      return res.status(404).send({ msg: "User not found." });
    }
    if (err.message === "USER_VERIFIED") {
      return res.status(400).send({ msg: "User is already verified." });
    }
    res.status(500).send({ msg: "Failed to resend verification email." });
  }
});

router.post('/auth/oauth', async (req, res) => {
  const { email, username, provider, providerUserId } = req.body;

  try {
    const result = await handleOAuthUser(req, res);
    res.status(201).send({ msg: "OAuth user registered successfully" });
  } catch (err) {
    if (err.message === "EMAIL_EXIST") {
      return res.status(400).send({ msg: "An account with this email already exist. Please log in." });
    }
    res.status(500).send({ msg: "OAuth user register failed" });
  }
});

router.post('/auth/login', validateUserLogIn, async (req, res) => {
  try {
    const result = await signIn(req, res);
    res.status(200).send(result);
  } catch (err) {
    if (err.message === 'INVALID_USER') {
      return res.status(400).send({ msg: "Invalid email or password" });
    }
    res.status(500).send({ msg: "Login failed" });
  }
});

router.get('/auth/verify-email', verifyEmail);

export default router;