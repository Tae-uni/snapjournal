const checkDuplicate = async (username, email) => {
  const emailExist = await strapi.query('plugin::users-permissions.user').findOne({ where: { email } });
  const usernameExist = await strapi.query('plugin::users-permissions.user').findOne({ where: { username } });

  if (emailExist && usernameExist) {
    throw new Error('Email and Username are already taken');
  }
  
  if (emailExist) {
    throw new Error('Email is already taken');
  }

  if (usernameExist) {
    throw new Error('Username is already taken');
  }
};

module.exports = { checkDuplicate };