// app/api/check-auth/route.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get the authentication cookie
    const cookieStore = cookies();
    // Make sure to await cookies operations
    const adminAuth = await cookieStore.get('admin_auth');
    
    if (adminAuth && adminAuth.value === 'true') {
      return NextResponse.json({ authenticated: true });
    } else {
      return NextResponse.json(
        { authenticated: false }, 
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth check error:', error);
    
    return NextResponse.json(
      { message: 'An error occurred checking authentication' }, 
      { status: 500 }
    );
  }
}