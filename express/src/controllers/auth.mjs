// Todo Log-in, Log-out, Password Reset,
import { User } from "../models/User.mjs";

// Instagram, Google Sign-up, Sign-in
export const handleOAuthUser = async (req, res) => {
  const { provider, accessToken, providerUserId, email, username } = req.body;

  try {
    let user = await User.findOne({
      $or: [{ email }, { providerUserId, provider }],
    });

    // New User
    if (!user) {
      user = new User({ email, username, provider, providerUserId, accessToken, isVerified: true, });
      await user.save();
      return { msg: "User registered successfully" };
    }

    // If local account exist, connect with SNS account.
    if (!user.provider && user.email === email) {
      user.provider = provider;
      user.providerUserId = providerUserId;
      user.accessToken = accessToken;
      user.isVerified = true;
      await user.save();
      return { msg: "User account linked with SNS successfully. "};
    }

    // Access token renew
    user.accessToken = accessToken;
    await user.save();

    return { msg: "User logged in successfully" };
  } catch (err) {
    console.error("OAuth user handling error:", err);
    return err;
  }
}