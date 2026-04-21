import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

/* ============================================================
   TRADEVO — main.jsx
   The entry point. React mounts the entire app here.
  ============================================================ */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
