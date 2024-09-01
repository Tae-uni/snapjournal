# Improving mail design - Nodemailer

The mails sending to the users are too simple. So I decided to improving design using by `CID(Content-ID)` which can embed images into an email. Also in NodeMailer, only can use simple HTML with inline CSS.  

```js
// config/email.js
.
.
const sendEmail = async (to, subject, html, attachments = []) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
    attachments: attachments.length > 0 ? attachments : undefined, // Attachments are optional.
  };
.
.
######################################
// emailService.js
.
.
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token={token}`;
  const emailHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 20px; text-align: center; border: 1px solid #ddd; border-radius: 10px;">
    <img src="cid:verifyEmail" alt="verified" style="width: 100px; margin-top: 20px;" />
    <h1 style="color: #333;">Confirm Your Email</h1>
    <p style="color: #555;">Verifying your email gives you access to more features. <br /> Click the button below to confirm your email address.</p>
    <a href="${verificationLink}" style="display: inline-block; padding: 15px 25px; color: #fff; background-color: #3498db; border-radius: 5px; text-decoration: none;">Confirm Email</a>
    <p style="color: #999; font-size: 12px; margin-top: 30px;">If you did not request this email, you can safely ignore it.</p>
  </div>
  `;
.
.
```
Apparently, this codes are normally works but still can see the .png file on Gmail.  
![verify](img/email-verify.png)