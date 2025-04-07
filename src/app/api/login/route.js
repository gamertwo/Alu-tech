// app/api/login/route.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Get credentials from environment variables
    const validEmail = process.env.ADMIN_EMAIL;
    const validPassword = process.env.ADMIN_PASSWORD;

    // Validate credentials
    if (!validEmail || !validPassword) {
      return NextResponse.json(
        { message: 'Server configuration error. Admin credentials not set.' }, 
        { status: 500 }
      );
    }

    // Check if credentials match
    if (email === validEmail && password === validPassword) {
      // Set authentication cookie
      const cookieStore = cookies();
      
      // Create a secure, HTTP-only cookie with expiration
      // Make sure to await cookies operations
      await cookieStore.set('admin_auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/',
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { message: 'Invalid email or password' }, 
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    
    return NextResponse.json(
      { message: 'An error occurred during login' }, 
      { status: 500 }
    );
  }
}