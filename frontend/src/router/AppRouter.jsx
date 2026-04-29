import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';

import AppLayout from '../components/layouts/AppLayout/AppLayout';

/* ============
  Lazy imports
============= */
const Home = lazy(() => import('../pages/Home/Home'));
const Shop = lazy(() => import('../pages/Shop/Shop'));
const Cart = lazy(() => import('../pages/Cart/Cart'));
const Login = lazy(() => import('../pages/Login/Login'))
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

/* =====================
  CREATE BROWSER ROUTER
====================== */
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: 'true', element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'shop/:categories', element: <Shop /> },
      { path: 'cart', element: <Cart /> },
      {path: 'login', element: <Login />},
      { path: 'dashboard', element: <Dashboard /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
