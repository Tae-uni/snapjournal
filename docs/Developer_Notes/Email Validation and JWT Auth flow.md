# Email Validation and JWT Auth flow
### User &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Server                                     
Email Verification

1. **Sign-Up Request**  ------>  User information received.
                                          Email token generated.
2. **Send Email**          <------  Email sent using `Nodemailer`.
3. **User Clicks Link**          Email token verification.
4. **Account Activation**  <------  Email verified and account activated.

---

### User &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Server                                     
JWT Authentication

1. **Login Request**  ------>  Verify user credentials.
                                        Generate JWT.
2. **Send JWT**         <------  Return JWT.
3. **Access Request**  ------>  Verify JWT.
                                        Process request or deny access.

---

### Nodemailer

Nodemailer connects to an SMTP (Simple Mail Transfer Protocol) server to send emails. Since Nodemailer itself doesn't provide an SMTP server, Gmail will be used for this project.

### Complete Workflow Explanation:

**1. User Registration and Email Verification**
- **User**: Sends a registration request with email and password.
- **Server**: Receives user data, generates an email verification token.
- **Server**: Uses Nodemailer to send a verification email with the token.
- **User**: Clicks the verification link in the email.
- **Server**: Verifies the token, activates the user's account, and sends a confirmation message.

**2. User Login and JWT Authentication**
- **User**: Sends a login request with credentials.
- **Server**: Verifies credentials, generates a JWT.
- **Server**: Sends the JWT back to the user.
- **User**: Uses the JWT to request access to protected resources.
- **Server**: Verifies the JWT, grants or denies access based on its validity.

This workflow ensures secure user registration and login processes, utilizing Nodemailer for email verification and JWT for session management.