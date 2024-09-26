import { NextRequest, NextResponse } from 'next/server';
import validateLogoutToken from '@/app/lib/validatelogouttoken';
import { updateSession } from '@/app/lib/getsessiondata';

export async function POST(req:any) {
  try {
    console.log("backchannel endpoint hit...")
    
    const formData = await req.formData();
    const logoutToken = formData.get('logout_token');
    console.log("logout token= "+logoutToken);

    //const logoutToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkF5aTc1U2ppZDZUWGNIRmtMU3hIViJ9.eyJpc3MiOiJodHRwczovL2Rldi15cmtxYzd3NXJuNzExaTdnLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NmUwMmI0NGQ1NzVhMWJlZWUzMzk1NTAiLCJhdWQiOiJNVU1kYVpISDlsdkdIdVBXUFVHVUpMVWhVQjVoUDRXTSIsImlhdCI6MTcyNzE2MzE1NywiZXhwIjoxNzI3MTYzMjc3LCJqdGkiOiI1M2Y5NjM5NS1kYzAwLTQxZDMtYWI1Ni01NDJlNmQ2YjA5ZGYiLCJldmVudHMiOnsiaHR0cDovL3NjaGVtYXMub3BlbmlkLm5ldC9ldmVudC9iYWNrY2hhbm5lbC1sb2dvdXQiOnt9fSwidHJhY2VfaWQiOiI4YzgxMTRlNTY4NTM0N2JkIiwic2lkIjoiZVp2MzN3ZHlqbGJCSkVWOWdtbWxfb3RDRHBfLVdoemwifQ.VO2ufbbbZ8pJoLCrX8XrMKqHCaziFNaXsoG4x0fEJvIe_gb53W_-g0Aw14VGvJCEwBCDtmFk9RQz2pdAx2Mb9PI0ccDygGjNabLTrNqB9hbT5pCVtFzyD-wfhV9ZpdOiUdK5gCfp0q0bQ_MMzRu3xD0PZknSCt9NDUgZBCSIPaPEs8HqalMtrlECebSqM-Y_HpPKXKuSpgNskWavP2z2Pd75F6F0hY7rw1QtGxcl_xgS7em6sxHzlCZt100YZij4FNoHBwZ2Ya0N6kCAV6C4yHKaxsoTJu5Ws6DKfqq2o_HKttsZEkktW88R5fWoYsagPOm2RScgO-oXNI7uNfUOKw";
  
    const res = new NextResponse();
    var result:any;
    if(logoutToken)
      result = await validateLogoutToken(logoutToken as string);
    else
      return NextResponse.json({ message: 'No logout token found' }, { status: 400 }); 

    console.log(result);
    if(result.isValid){
      const isUpdated = await updateSession(result.payload.sid,true);
    
      if (isUpdated?.rowCount>0) {
        return NextResponse.json({ message: 'Successfully logged out' }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'problem updating is_back_channel_logged_out flag' }, { status: 400 });
      }
    } 
    
    // Return success response
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
