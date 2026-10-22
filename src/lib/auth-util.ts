import crypto from "crypto";

/**
 * Hash password securely using Node crypto scrypt.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Verify a plain password against the stored salt:hash string.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(":");
    if (!salt || !key) return false;
    const keyBuffer = Buffer.from(key, "hex");
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

/**
 * Simple signed session token generator using HMAC-SHA256 (Valid for 1 year)
 */
const SECRET = process.env.SESSION_SECRET || "bob-secret-auth-key-2026";
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export function createSessionToken(userId: string, phone: string, name: string): string {
  const payload = Buffer.from(
    JSON.stringify({ userId, phone, name, exp: Date.now() + ONE_YEAR_MS })
  ).toString("base64url");
  const signature = crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string): { userId: string; phone: string; name: string } | null {
  try {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;
    const expectedSignature = crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (data.exp && Date.now() > data.exp) return null;
    return { userId: data.userId, phone: data.phone, name: data.name };
  } catch {
    return null;
  }
}
