'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';

export default function ProfileClient() {

    /* const checkUserSession = async () => {
        try
        {
            console.log("Inside checkUserSession function");
          const auth0Client = await initializeAuth0Client(); // Initialize or get the Auth0 client
          console.log("Auth0 Client initialized:", auth0Client);
      
           await auth0Client.checkSession().then(() => {
            console.log("Session check successful");
          }).catch((error: any) => {
            console.error("Session check failed:", error);
          });  
        }catch(error)
        {
            console.log("Error syncing session with auth0");
        }
    };

    useEffect(()=>{
        //checkUserSession();
    },[]); */
    
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <img src={user.picture as string} alt={user.name as string} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}