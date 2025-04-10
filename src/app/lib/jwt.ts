import { JWTPayload, SignJWT, jwtVerify } from 'jose';

const { JWT_ACCESS_SECRET = '', JWT_REFRESH_SECRET = '' } = process.env;

if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export const accessTokenExpireSec = 60 * 60; // 1시간
export const refreshTokenExpireSec = 60 * 60 * 24 * 30; // 30일
export const ISSUER = 'planit';

export function getEncodedKey(secret: string) {
  return new TextEncoder().encode(secret);
}

export async function signAccessToken(payload: JWTPayload, options?: { expiresIn?: number }) {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setExpirationTime(`${options?.expiresIn || accessTokenExpireSec}s`)
    .sign(getEncodedKey(JWT_ACCESS_SECRET));

  return jwt;
}

export async function signRefreshToken(payload: JWTPayload, options?: { expiresIn?: number }) {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setExpirationTime(`${options?.expiresIn || refreshTokenExpireSec}s`)
    .sign(getEncodedKey(JWT_REFRESH_SECRET));

  return jwt;
}

export async function verifyAccessToken<T = unknown>(token: string): Promise<T | null> {
  try {
    const { payload } = await jwtVerify<T>(token, getEncodedKey(JWT_ACCESS_SECRET));

    return payload;
  } catch (err) {
    console.log('[ACCESS TOKEN ERROR]', err);

    return null;
  }
}

export async function verifyRefreshToken<T = unknown>(token: string): Promise<T | null> {
  try {
    const { payload } = await jwtVerify<T>(token, getEncodedKey(JWT_REFRESH_SECRET));

    return payload;
  } catch (err) {
    console.log('[REFRESH TOKEN ERROR]', err);

    return null;
  }
}
