// src/components/Loading.js
export default function Loading({ label = 'Loading…' }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: 12,
    }}>
      <svg width="20" height="20" viewBox="0 0 50 50" aria-hidden>
        <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" fill="none" strokeOpacity="0.15" />
        <path d="M45 25a20 20 0 0 0-6.7-15.3" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none">
          <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.9s" repeatCount="indefinite"/>
        </path>
      </svg>
      <div style={{ color: '#374151', fontSize: 14 }}>{label}</div>
    </div>
  );
}
