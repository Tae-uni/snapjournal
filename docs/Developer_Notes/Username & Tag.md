# Tag
While handling errors in the authentication route, I realized that an issue occurs when a local user and an OAuth user have the same username. For example, if an OAuth user registers first, and a local user tries to use the same username, the error can be handled easily. However, if the local user takes the username first and then an OAuth user tries to use it, handling the error becomes tricky. Since it’s impossible to change the username for OAuth users, I decided to implement `a username + tag format`, similar to Discord.  

## How it works
Basically, the system allows users to register with the same username. After get username, 4-digit random number is appended as a tag. Then, the `username + tag` combination is existed in MongoDB. If it already exist, create new other tag which is not duplicate combination.

```js
const generateUniqueTag = async (username) => {
  let tag;
  let isUnique = false;

  while (!isUnique) {
    tag = Math.floor(1000 + Math.random() * 9000).toString();
    const existingUser = await User.findOne({ username, tag });
    if (!existingUser) {
      isUnique = true;
    }
  }
  return tag;
}
```