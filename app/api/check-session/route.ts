import { NextResponse } from 'next/server';
//import { getSession } from '@auth0/nextjs-auth0';

/* export async function GET(req: Request) {
  // Use Auth0 to get the session
  const session = await getSession();
    console.log(session)
  /* if (!session) {
    // No session found, respond with 401 and a logout URL
    return NextResponse.json({ redirectTo: '/api/auth/logout' }, { status: 401 });
  } */

  // Session exists, respond with a success message
  //return NextResponse.json({ message: 'Session active' });
//} */

import { getSession } from '@auth0/nextjs-auth0/edge';

const GET = async function GET(req: any) {
  const res = new NextResponse();
  const session = await getSession();
  console.log(session?.accessTokenExpiresAt);
  /* if(session !== null)
    session.user.sid = "destroyed"; */
  
  return NextResponse.json(session?.user);
};

export { GET };
