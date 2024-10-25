import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.provider;
    },
  },
  /* For SNS LogIn */
  provider: {
    type: String,
  },
  providerUserId: {
    type: String,
  },
  accessToken: {
    type: String,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  verificationExpires: {
    type: Date,
  },
});

export const User = mongoose.model('User', userSchema);