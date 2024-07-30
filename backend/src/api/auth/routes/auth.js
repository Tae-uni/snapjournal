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
  ],
};
