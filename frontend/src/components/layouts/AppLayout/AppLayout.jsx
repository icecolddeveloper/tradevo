import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

/* ────────────────────────────────────-----------------------------
  PAGE LOADING FALLBACK
 ─────────────────────────────────----------------------------─── */
function PageLoader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-text-muted)',
        fontFamily: 'var(--font-body)',
        minHeight: '60vh',
      }}
    >
      Loading...
    </div>
  );
}

/* ────────────────────────────────────-----------------------------
  ROOT LAYOUT
  Persistent Navbar & Footer with dynamic page content rendered via Outlet
  <Outlet /> is where child routes render.
 ─────────────────────────────────----------------------------─── */
function RootLayout() {
  return (
    <>
      <Navbar />
      <main className="page-content">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default RootLayout;
