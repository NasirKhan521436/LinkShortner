// src/pages/code/[code].js
import Header from '../../components/Header.js';
import { getLink } from '../../lib/links.js';

export default function StatsPage({ link, notFound }) {
  if (notFound) {
    return (
      <div className="container">
        <Header />
        <div className="card">Not found.</div>
      </div>
    );
  }

  // NOTE: The Date objects are now guaranteed to be strings when they arrive here, 
  // so we can safely convert them back to Date objects for display.
  return (
    <div className="container">
      <Header />
      <div className="card">
        <h2 style={{ margin: 0 }}>{link.code}</h2>
        <div style={{ marginTop: 8 }}><a href={link.target_url} target="_blank" rel="noreferrer">{link.target_url}</a></div>
        <div style={{ marginTop: 12 }}>
          <div className="small">Clicks: <strong>{link.clicks}</strong></div>
          {/* Use the string passed from props to create a Date object */}
          <div className="small">Created: {new Date(link.created_at).toLocaleString()}</div>
          <div className="small">Last clicked: {link.last_clicked ? new Date(link.last_clicked).toLocaleString() : '-'}</div>
        </div>
        <div style={{ marginTop: 12 }}>
          <a href={`/`}><button>Back to dashboard</button></a>
          <a href={`/${link.code}`} style={{ marginLeft: 8 }}><button>Open redirect</button></a>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { code } = params || {};
  if (!code) return { props: { notFound: true } };
  
  const row = await getLink(code);
  
  if (!row) return { props: { notFound: true } };

  // --- FIX APPLIED HERE ---
  // Convert all Date objects from the database (row) into serializable ISO strings
  const serializableLink = {
    ...row,
    // Convert created_at Date object to a string
    created_at: row.created_at.toISOString(),
    // Convert last_clicked Date object to a string, if it exists
    last_clicked: row.last_clicked ? row.last_clicked.toISOString() : null,
  };
  // -------------------------

  return { props: { link: serializableLink } };
}