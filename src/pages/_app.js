// src/pages/_app.js
import '../public/styles.css';
import '../styles/layout.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
