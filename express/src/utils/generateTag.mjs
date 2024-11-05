// import { User } from "../models/User.mjs";

// export const generateTag = async (username) => {
//   let tag;
//   let uniqueTag = false;
//   let attempts = 0;
//   const maxAttempts = 10;

//   // while (!uniqueTag && attempts < maxAttempts) {
//   //   tag = Math.floor(1000 + Math.random() * 9000).toString();
//   //   const existingUser = await User.findOne({ username, usernameTag: tag });
//   //   if (!existingUser) {
//   //     uniqueTag = true;
//   //   } else {
//   //     attempts += 1;
//   //   }
//   // }

//   for (let attempts = 0; attempts < maxAttempts; attempts++) {
//     tag = Math.floor(1000 + Math.random() * 9000).toString();
//     const existingUser = await User.findOne({ username, usernameTag: tag });
//     console.log("existingUser: ", existingUser);

//     console.log(`Attempt ${attempts + 1}: Trying tag ${tag} for username ${username}`);

//     if (!existingUser) {
//       console.log(`Unique tag found: ${tag}`);
//       return tag;
//     }
//   }

//   // if (!uniqueTag) {
//   //   throw new Error("CANNOT_GENERATE_TAG");
//   // }

//   console.error("Failed to generate tag after max attempts");
//   // return tag;
//   throw new Error("CANNOT_GENERATE_TAG");
// };