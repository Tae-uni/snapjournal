// Todo Register, Profile Management
import bcrypt from "bcrypt";

import { User } from "../models/User.mjs";

import { hashPassword } from "../utils/hashUtils.mjs";
import { generateTag } from "../utils/generateTag.mjs";

// const checkUserExists = async (email, username) => {
//   const existingUser = await User.findOne({
//     $or: [{ email }, { username }],
//   });

//   if (!existingUser) return;

//   if (existingUser.email === email) {
//     if (existingUser.provider && !existingUser.password) {
//       throw new Error("EMAIL_EXIST");
//     }
//     // Local account
//     throw new Error("EMAIL_EXIST");
//   }

//   if (existingUser.username === username) {
//     throw new Error("USERNAME_EXIST");
//   }
// };

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      throw new Error("EMAIL_EXIST");
    }

    const usernameTag = await generateTag(username);
    console.log(usernameTag);

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      usernameTag,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    const savedUser = await newUser.save();

    return { email: savedUser.email, userId: savedUser._id };
  } catch (err) {
    throw err;
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('INVALID_USER');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('INVALID_USER');
    }
    return { msg: "Login Successful" };
  } catch (err) {
    console.log("Sign-in error:", err);
    throw err;
  }
};