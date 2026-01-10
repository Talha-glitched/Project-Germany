// Minimal JWT implementation using only Web Crypto API (works with Convex)

function base64UrlEncode(str: string): string {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return atob(str);
}

export async function sign(payload: any, secret: string, expiresIn = "24h"): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const exp = expiresIn === "24h" ? now + 86400 : now + parseInt(expiresIn);
  
  const tokenPayload = { ...payload, iat: now, exp };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(tokenPayload));
  const message = `${encodedHeader}.${encodedPayload}`;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  const encodedSig = base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));

  return `${message}.${encodedSig}`;
}

export async function verify(token: string, secret: string): Promise<{ valid: boolean; payload?: any }> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return { valid: false };

    const [header, payload, sig] = parts;
    const message = `${header}.${payload}`;

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const expectedSig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
    const expectedSigStr = base64UrlEncode(String.fromCharCode(...new Uint8Array(expectedSig)));

    if (sig !== expectedSigStr) return { valid: false };

    const decoded = JSON.parse(base64UrlDecode(payload));
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return { valid: false };
    }

    return { valid: true, payload: decoded };
  } catch {
    return { valid: false };
  }
}

