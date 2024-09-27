// Import the required library for Vercel Postgres
import { sql } from '@vercel/postgres';

// Utility function to store session data in the database
export async function storeSession(sessionId: string, sub: string) {
    try {
      // SQL query to insert session data without specifying is_backchannel_logged_out
      const result = await sql`
        INSERT INTO user_sessions (session_id, sub)
        VALUES (${sessionId}, ${sub})
      `;
      return result;
    } catch (error) {
      console.error('Error storing session:', error);
      throw new Error('Failed to store session data');
    }
  }

/* export async function checkIfSessionExists(sessionId:string)
{
    try {
        const result = await sql`
            SELECT * FROM sessions
            WHERE session_id = ${sessionId}
        `;
        if(result.rowCount == 1)
            return true;
        return false;
    }catch(error){
        console.error('Error checking session:', error);
        throw new Error('Failed to fetch session data');
    }
}  

export async function isBackChannelLoggedOut(sessionId:string, sub:string)
{
    try {
        const result = await sql`
            SELECT * FROM sessions
            WHERE session_id = ${sessionId} AND sub = ${sub}
        `;
        if(result.rowCount == 1 && (result.rows[0].is_backchannel_logged_out == false))
            return true;
        return false;
    }catch(error){
        console.error('Error checking session:', error);
        throw new Error('Failed to fetch session data');
    }
}  */ 

// Utility function to get session data from the database
export async function getSessiondatabase(sessionId: string) {
  try {
    // SQL query to fetch session data
    const result = await sql`
      SELECT * FROM user_sessions
      WHERE session_id = ${sessionId}
    `;
    
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching session:', error);
    throw new Error('Failed to fetch session data');
  }
}

// Utility function to delete session data
export async function deleteSession(sessionId: string) {
  try {
    // SQL query to delete session data
    const result = await sql`
      DELETE FROM user_sessions
      WHERE session_id = ${sessionId}
    `;
    return result;
  } catch (error) {
    console.error('Error deleting session:', error);
    throw new Error('Failed to delete session data');
  }
}

// Utility function to update session data when logging out
export async function updateSession(sessionId: string, isBackChannelLoggedOut: boolean) {
  try {
    // SQL query to update session data
    const result = await sql`
      UPDATE user_sessions
      SET is_back_channel_logged_out = ${isBackChannelLoggedOut}
      WHERE session_id = ${sessionId}
    `;
    return result;
  } catch (error) {
    console.error('Error updating session:', error);
    throw new Error('Failed to update session data');
  }
}
