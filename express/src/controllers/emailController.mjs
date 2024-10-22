import { sendVerificationEmail } from "../utils/emailUtils.mjs";
import { generateToken } from "../utils/jwtUtils.mjs";
import { User } from "../models/User.mjs";

export const sendVerificationEmailHandler = async (email, userId) => {
  const verificationToken = generateToken({ userId }, '24h');

  console.log('Generated Token:', verificationToken);

  await User.updateOne({ _id: userId }, {
    verificationToken,
    verificationExpires: Date.now() + 3600000 * 24
  });
  console.log('User updated with token');
  await sendVerificationEmail(email, verificationToken);
  console.log('Email sent to:', email);
}