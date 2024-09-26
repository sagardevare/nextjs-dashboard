/* import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired();

export const config = {
  matcher: "/dashboard/:path*",
}; */



import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge'; // Note the /edge import
import { storeSession, getSessiondatabase } from './app/lib/getsessiondata';

export async function middleware(req:any) {
  const res = new NextResponse();
  const session = await getSession(req, res);
  if (!session?.user) {
    const redirectUrl = new URL('/api/auth/login', req.url); // Construct the URL
    return NextResponse.redirect(redirectUrl, 302); // Use a 302 status code for redirection
  }

  const sessionData = await getSessiondatabase(session.user.sid);

  if(sessionData && (sessionData['is_back_channel_logged_out'] == true))
    return NextResponse.redirect(new URL('/api/auth/logout',req.url));

  if(!sessionData)
    var result = await storeSession(session.user.sid,session.user.sub);
    

  console.log("middleware")
  console.log(session?.user)
  // If the user is authenticated, proceed with the request
  return NextResponse.next();
  //return NextResponse.redirect(new URL('/', req.url), res);
}


export const config = {
  matcher: ['/dashboard/:path*'],
};
