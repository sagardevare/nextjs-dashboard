import { getSession } from '@auth0/nextjs-auth0';

export default async function ProfileServer() {
  const session = await getSession();
  const user = session?.user;

  return (
      user && (
          <div>
            <p>{user.name}</p>
            <p>{session.accessToken}</p>
            <p>Access token ends here</p>
            <p>{session.accessTokenScope}</p>
            <p>{session.refreshToken}</p>
            <p>{session.idToken}</p>
            <p>{user.sid}</p>
          </div>
      )
  );
}