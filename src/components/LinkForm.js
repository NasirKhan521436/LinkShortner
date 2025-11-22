// src/components/LinkForm.js
import { useState } from 'react';

export default function LinkForm({ onCreated }) {
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  function validateCode(c) {
    return /^[A-Za-z0-9]{6,8}$/.test(c);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);

    if (!url.trim()) {
      setErr('Target URL is required.');
      return;
    }

    setLoading(true);
    try {
      const body = { target_url: url.trim() };
      if (code.trim()) {
        if (!validateCode(code.trim())) {
          setErr('Code must be 6-8 alphanumeric characters.');
          setLoading(false);
          return;
        }
        body.code = code.trim();
      }
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.status === 201) {
        const json = await res.json();
        setUrl('');
        setCode('');
        onCreated && onCreated(json);
      } else if (res.status === 409) {
        setErr('Code already exists. Choose another.');
      } else {
        const j = await res.json().catch(() => null);
        setErr((j && j.error) || 'Failed to create link.');
      }
    } catch (e) {
      setErr('Network error.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          placeholder="https://example.com/very/long/url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-label="target_url"
        />
        <input
          placeholder="custom code (optional, 6-8 chars)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          aria-label="code"
          style={{ width: 220 }}
        />
        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
      </div>
      {err && <div className="inline-error">{err}</div>}
    </form>
  );
}
