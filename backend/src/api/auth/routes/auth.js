module.exports = {
  routes: [
    {
      "method": "POST",
      "path": "/api/auth/local/register",
      "handler": "auth.register",
      "config": {
        "policies": []
      }
    }
  ],
};