# Cookie, Session, JWT

## 1. Cookies

### What Are Cookies?
**Cookies** are small pieces of data stored on the client(browser) and are sent to the server with every HTTP request. They are used to store data such as user session, authentication details, and user preferences.

### Type of Cookies
- **Session Cookies**: Temporary cookies that are delated once the browser is closed.  
- **Presistent Cookies**: Cookies stored on the user's hard drive and have an expirtation date.  

### How Cookies Work
- When a user visits a website, the cookies stored in their browser are automatically sent with HTTP requests to the server.  
- Cookies are often used for managing user authentication and sessions.  

## 2. Sessions

### What Are Sessions?
**Session** store data server-side while users interact with an application. They are typically used to track logged-in users or to maintain state across requests.  

### How Sessions Work
- The server stores session data, while the client stores a session ID (typically in a cookie).  
- The session ID is sent with each request, allowing the server to retrieve user-specific data from its storage.  

## 3. JWT (JSON Web Token)

### What is JWT?
JWT is a compact, self-contained token format used for securely transmitting information between parties. It consists of three parts.  

1. **Header**: Contains metadata, such as the type of token and the hasing algorithm used.
2. **Payload**: Contains claims (user data such as user ID, email, etc.).
3. **Signature**: Used to to verify the token hasn't been tempered with.  

### How JWT Works
- After successful authentication, the server generates a JWT and sends it to the client.
- The client stores the JWT (in cookies, localStorage, or sessionStorage) and includes it in subsequent requests (typically in the `Authorization` header).
- The server verifies the JWT and processes the request based on the token's payload.

## Reference
[JWT/Session Cookies](https://itequia.com/en/jwt-or-session-cookies-the-dilemma-of-authentication-in-web-environments/)