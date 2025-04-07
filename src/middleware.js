// middleware.js
import { NextResponse } from 'next/server';

export async function middleware(request) {
  try {
    // Get the auth cookie from the request
    const adminAuth = request.cookies.get('admin_auth');
    
    // Check if the user is trying to access the admin page or admin APIs
    const isAdminPage = request.nextUrl.pathname === '/admin';
    const isAdminApi = request.nextUrl.pathname.startsWith('/api/meeting-requests') || 
                        request.nextUrl.pathname.startsWith('/api/messages');
    
    // Allow access to login and check-auth API endpoints
    if (request.nextUrl.pathname === '/api/login' || 
        request.nextUrl.pathname === '/api/logout' ||
        request.nextUrl.pathname === '/api/check-auth') {
      return NextResponse.next();
    }
    
    // If accessing admin page or API without auth, redirect to login
    if ((isAdminPage || isAdminApi) && (!adminAuth || adminAuth.value !== 'true')) {
      // For API requests, return 401
      if (isAdminApi) {
        return NextResponse.json(
          { message: 'Unauthorized' }, 
          { status: 401 }
        );
      }
      
      // For page requests, allow access to login form
      // The component itself will handle showing the login form
      return NextResponse.next();
    }
    
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ['/admin', '/api/:path*']
};