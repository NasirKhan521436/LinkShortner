// src/pages/api/links/index.js
import { isValidUrl, isValidCode } from '../../../lib/validators.js';
import { createLink, listLinks, generateCode, getLink } from '../../../lib/links.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const rows = await listLinks();
    return res.status(200).json(rows);
  }

  if (req.method === 'POST') {
    const { target_url, code } = req.body || {};
    if (!target_url || !isValidUrl(target_url)) {
      return res.status(400).json({ error: 'invalid url' });
    }

    let useCode = code;
    if (useCode) {
      if (!isValidCode(useCode)) return res.status(400).json({ error: 'invalid code' });
      // attempt to create
      try {
        const created = await createLink(useCode, target_url);
        return res.status(201).json(created);
      } catch (err) {
        if (err.code === 'CONFLICT' || err.message === 'code exists') {
          return res.status(409).json({ error: 'code already exists' });
        }
        console.error(err);
        return res.status(500).json({ error: 'internal error' });
      }
    } else {
      // generate code (6..8 length). Ensure uniqueness by checking DB.
      let attempts = 0;
      while (attempts < 5) {
        const len = 6; // use 6 for shortness; generator can be adjusted
        const candidate = generateCode(len);
        try {
          const created = await createLink(candidate, target_url);
          return res.status(201).json(created);
        } catch (err) {
          if (err.code === 'CONFLICT' || err.message === 'code exists') {
            attempts++;
            continue;
          }
          console.error(err);
          return res.status(500).json({ error: 'internal error' });
        }
      }
      return res.status(500).json({ error: 'could not generate unique code' });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).end('Method Not Allowed');
}
