# Memory Leak

## Work Details
Customize Strapi's override plugin `users-permissions` for exact message for Register. [Strapi Official Github](https://github.com/strapi/strapi/blob/v4.25.2/packages/plugins/users-permissions/server/controllers/auth.js#L293) But it occures memory leak problem

## Issues
Here's the code for the 


```js
module.exports = (plugin) => {
  plugin.controllers.auth.register = async (ctx) => {
    const { email, username } = ctx.request.body;

    try {
      const existingUser = await strapi.query('plugin::users-permissions.user').findOne({
        where: {
          $or: [{ email }, { username }],
        },
      });

      if (existingUser) {
        if (existingUser.email === email) {
          return ctx.badRequest('Email is already taken');
        } else if (existingUser.username === username) {
          return ctx.badRequest('Email or username are already taken');
        }
      }

      const defaultRegister = strapi.plugins['users-permissions'].controllers.auth.register;
      await defaultRegister(ctx);
    } catch (error) {
      console.error('Error during registration', error);
      return ctx.badRequest('Registration failed due to server error');
    }
  };

  return plugin;
};
```


## References
[Node.js Official Site](https://nodejs.org/en/learn/diagnostics/memory)  
[Node.js-Memory Leaks](https://www.netguru.com/blog/node-js-memory-leaks)  
  