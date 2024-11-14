import { sendVerificationEmail } from "../utils/emailUtils.mjs";
import { generateToken, verifyToken } from "../utils/jwtUtils.mjs";

import { User } from "../models/User.mjs";

export const sendVerificationEmailHandler = async (email, userId) => {
  const emailVerificationToken = generateToken({ userId }, '24h');

  console.log('Generated Token:', emailVerificationToken);

  await User.updateOne({ _id: userId }, {
    emailVerificationToken,
    emailVerificationExpires: Date.now() + 3600000 * 24
  });
  console.log('User updated with token');
  await sendVerificationEmail(email, emailVerificationToken);
  console.log('Email sent to:', email);
}

export const resendVerificationEmailHandler = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  if (user.isVerified) {
    throw new Error("USER_VERIFIED");
  }

  const emailVerificationToken = generateToken({ userId }, '24h');

  await User.updateOne({ _id: userId }, {
    emailVerificationToken,
    emailVerificationExpires: Date.now() + 3600000 * 24
  });
  console.log('User updated with the new token');
  await sendVerificationEmail(user.email, emailVerificationToken);
  console.log('Email resent to:', user.email);
}

export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }
    if (user.isVerified) {
      return res.status(200).send({ msg: "User already verified." });
    }

    user.isVerified = true;
    delete user.emailVerificationToken;
    delete user.emailVerificationExpires;
    await user.save();

    return res.status(200).send({ msg: "Email verified successfully." });
  } catch (err) {
    console.error("Verification error: ", err);
    return res.status(400).send({ msg: "Invalid or expired token" });
  }
};