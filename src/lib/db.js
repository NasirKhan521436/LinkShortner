// src/lib/db.js
import pkg from 'pg';
const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL not set in environment');
}

const pool = new Pool({ connectionString, max: 10 });

export async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}

export default pool;
