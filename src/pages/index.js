// src/pages/index.js
import { useEffect, useState } from 'react';
import Header from '../components/Header.js';
import LinkForm from '../components/LinkForm.js';
import LinkTable from '../components/LinkTable.js';

export default function Home() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchLinks() {
    setLoading(true);
    try {
      const res = await fetch('/api/links');
      if (res.ok) {
        const data = await res.json();
        setLinks(data);
      } else {
        setLinks([]);
      }
    } catch (e) {
      setLinks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLinks();
  }, []);

  async function handleDelete(code) {
    if (!confirm(`Delete ${code}? This cannot be undone.`)) return;
    const res = await fetch(`/api/links/${code}`, { method: 'DELETE' });
    if (res.status === 204) {
      setLinks((s) => s.filter((l) => l.code !== code));
    } else {
      alert('Failed to delete.');
    }
  }

  function onCreated(newLink) {
    setLinks((s) => [newLink, ...s]);
    alert(`Created ${newLink.code}`);
  }

  return (
    <div className="container">
      <Header />
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Create a short link</h3>
        <LinkForm onCreated={onCreated} />
      </div>

      {loading ? (
        <div className="card" style={{ marginTop: 12 }}>Loading…</div>
      ) : (
        <LinkTable links={links} onDelete={handleDelete} />
      )}
    </div>
  );
}
