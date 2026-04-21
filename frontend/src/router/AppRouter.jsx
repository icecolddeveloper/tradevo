import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';

import AppLayout from '../components/layouts/AppLayout/AppLayout';

/* ============
  Lazy imports
============= */
const Home = lazy(() => import('../pages/Home'));

/* =====================
  CREATE BROWSER ROUTER
====================== */
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ index: 'true', element: <Home /> }],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
