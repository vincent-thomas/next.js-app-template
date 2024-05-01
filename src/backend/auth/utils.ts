import { base64url } from "jose";
import crypto from "node:crypto";

export function generateCodeVerifier() {
  const randomValues = new Uint8Array(32);
  crypto.getRandomValues(randomValues);
  return base64url.encode(randomValues);
}
export function generateState() {
  const randomValues = new Uint8Array(32);
  crypto.getRandomValues(randomValues);
  return base64url.encode(randomValues);
}
