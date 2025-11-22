// src/lib/links.js
import { query } from './db.js';

export async function createLink(code, target_url) {
  const text = `INSERT INTO links(code, target_url) VALUES($1, $2) RETURNING code, target_url, clicks, created_at, last_clicked`;
  const values = [code, target_url];
  try {
    const res = await query(text, values);
    return res.rows[0];
  } catch (err) {
    // postgres duplicate key error code '23505'
    if (err.code === '23505') {
      const e = new Error('code exists');
      e.code = 'CONFLICT';
      throw e;
    }
    throw err;
  }
}

export async function getLink(code) {
  const res = await query(
    `SELECT code, target_url, clicks, created_at, last_clicked FROM links WHERE code = $1`,
    [code]
  );
  return res.rows[0] || null;
}

export async function listLinks() {
  const res = await query(
    `SELECT code, target_url, clicks, created_at, last_clicked FROM links ORDER BY created_at DESC`
  );
  return res.rows;
}

export async function deleteLink(code) {
  const res = await query(`DELETE FROM links WHERE code = $1 RETURNING code`, [code]);
  return res.rowCount > 0;
}

export async function incrementAndGet(code) {
  const res = await query(
    `UPDATE links
     SET clicks = clicks + 1, last_clicked = now()
     WHERE code = $1
     RETURNING target_url, clicks, last_clicked`,
    [code]
  );
  return res.rows[0] || null;
}

// generate a random code 6 chars by default (can be 6..8 length)
export function generateCode(len = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let out = '';
  for (let i = 0; i < len; i++) out += chars.charAt(Math.floor(Math.random() * chars.length));
  return out;
}
