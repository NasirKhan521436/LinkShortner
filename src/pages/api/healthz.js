import pool from '../../../lib/db.js';

export default async function handler(req, res) {
  let dbOk = false;
  try {
    await pool.query('SELECT 1');
    dbOk = true;
  } catch (e) {
    dbOk = false;
  }

  res.status(200).json({ ok: true, version: '1.0', db: dbOk ? 'ok' : 'down' });
}
