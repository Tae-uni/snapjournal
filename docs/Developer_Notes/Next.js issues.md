# Next.js issues
Cookies().get Error.  
This is the post that I put discord official `Next.js`  

> Hello, I’ve managed to set up the authJwt, but I’m stuck on something kind of frustrating. For some reason, I can’t seem to grab these cookies from the headers when I make follow-up requests. Here’s my code  

```ts
"use server";
import axiosInstance from "@/lib/axiosInstance";
import { cookies } from "next/headers";

export const resendConfirmationEmail = async () => {
  try {

    const jwtToken = cookies().get("authJwt")?.value;

    if (!jwtToken) {
      console.error('JWT token not found in cookies.');
      return false;
    }

    const response = await axiosInstance.post('/api/auth/local/resend-confirmation',
      {},
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        withCredentials: true, // HTTP-Only Cookie
      }
    );

    return response.status === 200;
  } catch (error) {
    console.error('Error resending email:', error);
    return false;
  }
};
```

And I got comment, like