import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { axiosInstance } from "@/lib/axiosInstance";


export async function POST() {
  try {
    if (!cookies().has('auth')) {
      return NextResponse.json({ error: 'JWT token not found in cookies' }, { status: 400 });
    }

    const jwtToken = cookies().get('auth')?.value;
    console.log('Token get:',jwtToken)

    if (!jwtToken) {
      return NextResponse.json({ error: 'Cannot get the cookies' }, { status: 400 });
    }

    const response = await axiosInstance.post(
      '/api/auth/local/resend-confirmation',
      {},
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        withCredentials: true,
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error resending email' }, { status: 500 });
  }
}