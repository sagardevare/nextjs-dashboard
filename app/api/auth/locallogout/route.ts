import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Clear the app session cookie
  const response = NextResponse.redirect(new URL('/', req.url));
  response.cookies.set('appSession', '', { path: '/', expires: new Date(0) });
  return response;
}


