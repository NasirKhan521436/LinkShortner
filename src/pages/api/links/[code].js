// src/pages/api/links/[code].js
import { getLink, deleteLink } from '../../../lib/links.js';

export default async function handler(req, res) {
  const { code } = req.query;

  if (req.method === 'GET') {
    const row = await getLink(code);
    if (!row) return res.status(404).json({ error: 'not found' });
    return res.status(200).json(row);
  }

  if (req.method === 'DELETE') {
    const ok = await deleteLink(code);
    if (!ok) return res.status(404).json({ error: 'not found' });
    return res.status(204).end();
  }

  res.setHeader('Allow', 'GET, DELETE');
  return res.status(405).end('Method Not Allowed');
}
