// src/lib/validators.js

export const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

export function isValidCode(code) {
  return typeof code === 'string' && CODE_REGEX.test(code);
}

export function isValidUrl(v) {
  if (typeof v !== 'string' || v.trim() === '') return false;
  try {
    const u = new URL(v.trim());
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;
    // disallow localhost and private IPs for safety (simple checks)
    if (u.hostname === 'localhost' || u.hostname === '127.0.0.1') return false;
    return true;
  } catch (e) {
    return false;
  }
}
