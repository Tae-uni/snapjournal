import { User } from "../models/User.mjs";
import { hashPassword } from "../utils/hashUtils.mjs";

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

    await newUser.save();
    return res.status(201).send({ msg: "Registration successful" });
  } catch (err) {
    handleError(err, res);
  }
};

const handleError = (err, res) => {
  if (err.message === 'EMAIL_TAKEN') {
    return res.status(400).send({ msg: "This email is already taken" });
  }
  if (err.message === 'USERNAME_TAKEN') {
    return res.status(400).send({ msg: "Username is already taken" });
  }
  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(400).send({ msg: "Duplicate entry error" });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).send({ msg: "Validation error" });
  }

  console.error("Error during registration:", err);
  return res.status(500).send({ msg: "Server error" });
};