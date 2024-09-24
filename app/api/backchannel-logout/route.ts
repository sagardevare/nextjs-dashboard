import { NextRequest, NextResponse } from 'next/server';
//import validateLogoutToken from '@/app/lib/validatelogouttoken';
//import { deleteUserSessions } from '@/utils/sessions';

export async function POST(req:NextRequest) {
  try {
    console.log("backchannel endpoint hit...")
    //const body = await req.json();
    
    console.log(req);
    /* const logouttoken = req?.body?.logout_token;
    console.log(logouttoken); */
    
    // Call the middleware to validate the logout token
     const res = new NextResponse();
    /* await new Promise((resolve, reject) => {
      validateLogoutToken(req, res, (err: any) => {
        if (err) return reject(err);
        resolve(null);
      });
    });  */

    // Access the logout token
    const { logoutToken } = (req as any);
    console.log(logoutToken);
    // Delete user session using `sub` or `sid`
    //await deleteUserSessions(logoutToken.sub, logoutToken.sid);
    console.log("Session deleted")

    // Return success response
    return NextResponse.json({ message: 'User logged out successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
