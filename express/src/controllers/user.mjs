// Todo Register, Profile Management
import bcrypt from "bcrypt";

import { User } from "../models/User.mjs";

import { hashPassword } from "../utils/hashUtils.mjs";
import { generateToken } from "../utils/jwtUtils.mjs";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      const error = new Error("EMAIL_EXIST")
      throw error;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      provider: "Local",
      isVerified: false,
    });

    const savedUser = await newUser.save();

    const registrationAccessToken = generateToken({ userId: savedUser._id }, '24h');
    console.log("register token: ", registrationAccessToken);

    return { email: savedUser.email, userId: savedUser._id, registrationAccessToken };
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

    if (user.blocked) {
      throw new Error('USER_BLOCKED');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('INVALID_USER');
    }
    return { 
      id: user._id,
      username: user.username,
    };

  } catch (err) {
    console.log("Sign-in error:", err);
    throw err;
  }
};