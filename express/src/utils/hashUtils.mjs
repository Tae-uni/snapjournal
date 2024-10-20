import bcrypt from "bcrypt";

const saltRounds = 12;

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  console.log(salt);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (plain, hashed) => 
  await bcrypt.compare(plain, hashed);