module.exports = {
  routes: [
    {
      method: "POST",
      path: "/auth/local/register",
      handler: "auth.register",
      config: {
        "policies": []
      }
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
      handler: "verify.resend",
      config: {
        "policies": []
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
      method: "POST",
      path: "/auth/local/reset-password",
      handler: "verify.reset",
      config: {
        "policies": []
      }
    },
  ],
};
