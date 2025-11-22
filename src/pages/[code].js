// src/pages/[code].js
import { incrementAndGet } from '../lib/links.js';

export default function Page() {
  // This page never renders client-side; all handled server-side.
  return null;
}

export async function getServerSideProps({ params, res }) {
  const { code } = params || {};
  if (!code) {
    res.statusCode = 404;
    return { props: {} };
  }

  try {
    const updated = await incrementAndGet(code);
    if (!updated) {
      res.statusCode = 404;
      return { props: {} };
    }
    // perform 302 redirect
    res.setHeader('Location', updated.target_url);
    res.statusCode = 302;
    res.end();
    return { props: {} };
  } catch (err) {
    console.error('redirect error', err);
    res.statusCode = 500;
    return { props: {} };
  }
}
