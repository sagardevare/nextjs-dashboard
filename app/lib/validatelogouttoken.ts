import jwt from 'jsonwebtoken';
import axios from 'axios';

interface ValidateLogoutTokenResult {
  isValid: boolean;
  error?: string;
  payload?: any;
}

// Get JWKS for token verification
const getJWKS = async (issuerBaseUrl: string) => {
  const { data } = await axios.get(`${issuerBaseUrl}/.well-known/jwks.json`);
  return data.keys;
};

const keyToPem = (x5c: string) => {
  return `-----BEGIN CERTIFICATE-----\n${x5c.match(/.{1,64}/g)?.join('\n')}\n-----END CERTIFICATE-----`;
};

// Utility function to validate the logout token
const validateLogoutToken = async (logoutToken: string): Promise<ValidateLogoutTokenResult> => {
  try {
    // Get the JWKS
    const jwks = await getJWKS(process.env.AUTH0_ISSUER_BASE_URL!);

    // Decode the JWT header to find the key ID (kid)
    const decodedHeader = jwt.decode(logoutToken, { complete: true });
    if (!decodedHeader || typeof decodedHeader === 'string') {
      return { isValid: false, error: 'Invalid logout token' };
    }

    const { kid } = decodedHeader.header;
    console.log('From decoded header: ' + kid);

    // Find the corresponding public key
    const key = jwks.find((key: any) => key.kid === kid);
    if (!key) {
      return { isValid: false, error: 'No matching key found in JWKS' };
    }

    const publicKey = keyToPem(key.x5c[0]);
    console.log('Public key:', publicKey);

    // Verify the JWT
    let payload: any;
    jwt.verify(logoutToken, publicKey, {
      algorithms: ['RS256'],
      issuer: process.env.AUTH0_ISSUER_BASE_URL + '/',
      audience: process.env.AUTH0_CLIENT_ID,
      ignoreExpiration: true, // Bypass token expiration (for testing)
    }, (err, decoded) => {
      if (err) {
        payload = null;
        console.log('JWT verification error:', err);
      } else {
        payload = decoded;
      }
    });

    // If the payload wasn't set, JWT verification failed
    if (!payload) {
      return { isValid: false, error: 'JWT verification failed' };
    }

    console.log('Payload:', payload);

    // Check if it contains either `sub` or `sid`
    if (!payload.sub && !payload.sid) {
      return { isValid: false, error: 'Logout token must contain sub or sid' };
    }

    // Check for `events` claim
    if (!payload.events || !payload.events['http://schemas.openid.net/event/backchannel-logout']) {
      return { isValid: false, error: 'Logout token must contain backchannel-logout event' };
    }

    // Check for absence of `nonce`
    if (payload.nonce) {
      return { isValid: false, error: 'Logout token must not contain a nonce claim' };
    }

    // If all checks pass, return success with the payload
    return { isValid: true, payload };

  } catch (error: any) {
    // Catch any errors and return as a failure
    return { isValid: false, error: error.message };
  }
};

export default validateLogoutToken;
