// app/api/logout/route.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Clear the authentication cookie
    const cookieStore = cookies();
    // Make sure to await cookies operations
    await cookieStore.delete('admin_auth');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    
    return NextResponse.json(
      { message: 'An error occurred during logout' }, 
      { status: 500 }
    );
  }
}