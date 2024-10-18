export const userValidationSchema = {
  username: {
    trim: true,
    isLength: {
      options: { min: 3, max: 20 },
      errorMessage: "Username must be at least 3 characters with a max of 20 characters."
    },
    notEmpty: {
      errorMessage: "Username cannot be empty.",
    },
    matches: {
      options:
        [/^(?=.*[A-Za-z])[A-Za-z0-9_]+$/],
      errorMessage: "Username can only contain letters, numbers underscores.",
    },
  },
  email: {
    trim: true,
    isEmail: {
      errorMessage: "Enter a valid email.",
    },
    notEmpty: {
      errorMessage: "Email cannot be empty.",
    },
    normalizeEmail: true,
    // custom: {
    //   options: (value) => {
    //     const blockedDomains = ['mailinator.com', 'tempmail.com'];
    //     const domain = value.split('@')[1];
    //     if (blockedDomains.includes(domain)) {
    //       throw new Error('Disposable email addresses are not allowed');
    //     }
    //     return true;
    //   },
    //   errorMessage: "Disposable email addresses are not allowed",
    // },
  },
  password: {
    trim: true,
    isLength: {
      options: { min: 6, max: 30 },
      errorMessage: "Password must be at least 6 characters with a max of 30 characters.",
    },
    notEmpty: {
      errorMessage: "Email cannot be empty."
    },
    matches: {
      options:
        /[A-Za-z]/,
        errorMessage: "Password must contain a letter",
    },
    matches: {
      options:
        /[0-9]/,
        errorMessage: "Password must contain a number",
    },
  }
}