# Improving mail design - Nodemailer

The emails being sent to users are too simple, so I decided to improve the design using `CID (Content-ID)` which can embed images into an email. In Nodemailer, you can only use simple HTML with inline CSS.

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
Apparently, these codes normally work, but the .png file can still be seen as an attachment in Gmail.
![verify](img/email-verify.png)  
**I also tried using an image buffer and an Imgur URL, but the same problem persists.**  

```js
const sendEmail = async (to, subject, html, imageUrl = null, cid = 'defaultImageCid') => {
  let attachments = [];

  if (imageUrl) {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

    // Add the image to attachments
    attachments.push({
      content: imageBuffer,
      cid: cid,
      contentType: 'image/png',
    });
  }
```
  


### References
- [Embedding Images in Nodemailer Using CID](https://www.educative.io/answers/how-to-embed-image-using-nodemailer)  
- [Nodemailer](https://nodemailer.com/message/embedded-images/)