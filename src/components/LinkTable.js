// src/components/LinkTable.js
import { useState } from 'react';

export default function LinkTable({ links = [], onDelete }) {
  const [filter, setFilter] = useState('');

  const filtered = links.filter(
    (l) =>
      l.code.toLowerCase().includes(filter.toLowerCase()) ||
      l.target_url.toLowerCase().includes(filter.toLowerCase())
  );

  if (links.length === 0) {
    return <div className="empty card">No links yet. Create your first short link.</div>;
  }

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ fontWeight: 600 }}>Links</div>
        <input placeholder="Search code or URL" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding:8, borderRadius:6, border:'1px solid #e6e9f0' }} />
      </div>

      <table className="table" role="table">
        <thead>
          <tr>
            <th>Short code</th>
            <th>Target URL</th>
            <th className="clicks">Clicks</th>
            <th>Last clicked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((l) => (
            <tr key={l.code}>
              <td><a href={`/${l.code}`}>{l.code}</a></td>
              <td title={l.target_url} style={{ maxWidth: 420, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.target_url}</td>
              <td className="small">{l.clicks}</td>
              <td className="small">{l.last_clicked ? new Date(l.last_clicked).toLocaleString() : '-'}</td>
              <td className="actions">
                <button onClick={async () => {
                  const full = `${window.location.origin}/${l.code}`;
                  await navigator.clipboard.writeText(full);
                  alert('Copied: ' + full);
                }}>Copy</button>
                <button onClick={() => onDelete(l.code)}>Delete</button>
                <a href={`/code/${l.code}`}><button>Stats</button></a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
