module.exports = {
  routes: [
    {
      method: "POST",
      path: "/auth/local/registers",
      handler: "auth.register",
      config: {
      },
    },
    {
      method: "GET",
      path: "/auth/local/verify",
      handler: "verify.verify",
      config: {
        "policies": []
      }
    },
    {
      method: "POST",
      path: "/auth/local/resend-confirmation",
      handler: "auth.resend",
      config: {
      }
    },
    {
      method: "POST",
      path: "/auth/local/forgot-password",
      handler: "verify.forgot",
      config: {
        "policies": []
      }
    },
    {
      method: "GET",
      path: "/auth/local/expire",
      handler: "verify.expire",
      config: {
        "policies": []
      }
    },
    {
      method: "POST",
      path: "/auth/local/reset-password",
      handler: "verify.reset",
      config: {
        "policies": []
      }
    },
  ],
};
