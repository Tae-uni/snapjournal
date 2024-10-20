import { User } from "../models/User.mjs";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({ msg: "This email is already taken" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).send({ msg: "Username or email are already taken" });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    return res.status(201).send({ msg: "Registration successful" });
  } catch (err) {
    return res.status(500).send({ msg: "Server error" });
  }
}