import { User } from "../models/User.mjs";

export const generateTag = async (username) => {
  let tag;
  let isUnique = false;

  while (!isUnique) {
    tag = Math.floor(1000 + Math.random() * 9000).toString();
    const existingUser = await User.findOne({ username, usernameTag: tag });
    if (!existingUser) {
      isUnique = true;
    }
  }

  return tag;
};