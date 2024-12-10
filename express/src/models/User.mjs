import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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
  blocked: {
    type: Boolean,
    default: false,
    required: true,
  },
  blockReason: {
    type: String,
    default: null,
  },
  blockedAt: {
    type: Date,
    default: null,
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
  emailVerificationToken: {
    type: String,
  },
  emailVerificationExpires: {
    type: Date,
  },
});

userSchema.pre('save', function (next) {
  if (this.isModified('blocked') && this.blocked) {
    this.blockedAt = new Date();
    if (!this.blockReason) {
      this.blockReason = "No reason provided";
    }
  }
  next();
});

export const User = mongoose.model('User', userSchema);