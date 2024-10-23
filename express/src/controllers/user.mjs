import { User } from "../models/User.mjs";
import { hashPassword } from "../utils/hashUtils.mjs";
import bcrypt from "bcrypt";

const checkEmailExists = async (email) => {
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new Error('EMAIL_TAKEN');
  }
};

const checkUsernameExists = async (username) => {
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new Error('USERNAME_TAKEN');
  }
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await checkEmailExists(email);
    await checkUsernameExists(username);

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
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
}
