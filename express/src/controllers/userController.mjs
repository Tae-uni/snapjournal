import { User } from "../models/User.mjs";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ msg: "This email is already taken" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    // What if there's an error when save the user.
  } catch {

  }
}