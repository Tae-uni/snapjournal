import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { axiosInstance } from "@/lib/axiosInstance";


export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    const response = await axiosInstance.post('/api/auth/local/registers', {
      username,
      email,
      password,
    },
      {
        withCredentials: true,
      }
    );

    return NextResponse.json(response.data);

    // const jwtToken = response.data.token;
    // console.log('token get!', jwtToken);

    // const res = NextResponse.json({ success: true });
    // res.cookies.set('auth', jwtToken, {
    //   httpOnly: false,
    //   secure: true,
    //   sameSite: 'none',
    //   path: '/',
    //   maxAge: 60 * 60 * 24 * 7 // 1 week
    // });

    // return res;
  } catch (error) {
    return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
  }
}