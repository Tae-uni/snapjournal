# OAuth2
What is OAuth2?  
`OAuth 2.0`  is the industry-standard protocol for authorization. OAuth 2.0 focuses on client developer simplicity while providing specific authorization flows for web applications, desktop, applications, mobile phones, and devices.

## Work details
I implemented user registration in Strapi using a custom controller, endpoint(`registers`) and everything worked well when sending emails via Nodemailer with Gmail's app password. However, after deciding to switch to Strapi's built-in register function for user registration, I encountered a errors while trying to send emails.

## Issues
```json
{
    "data": null,
    "error": {
        "status": 400,
        "name": "ApplicationError",
        "message": "SMTP code:550 msg:550-5.7.25 [211.194.214.75] The IP address sending this message does not have a\r\n550-5.7.25 PTR record setup, or the corresponding forward DNS entry does not\r\n550-5.7.25 match the sending IP. As a policy, Gmail does not accept messages\r\n550-5.7.25 from IPs with missing PTR records. For more information, go to\r\n550-5.7.25  https://support.google.com/a?p=sender-guidelines-ip \r\n550-5.7.25 To learn more about Gmail requirements for bulk senders, visit\r\n550 5.7.25  https://support.google.com/a?p=sender-guidelines. d2e1a72fcca58-71df0d7d1dasi4086920b3a.225 - gsmtp\r\n",
        "details": {}
    }
}
```

## Solutions

## References
[OAuth2](https://oauth.net/2/)