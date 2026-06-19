import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';

import RootLayout from '../components/layouts/Root/RootLayout';

/* ============
  Lazy imports
============= */
const Home = lazy(() => import('../pages/Home/Home'));
const Shop = lazy(() => import('../pages/Shop/Shop'));
const Cart = lazy(() => import('../pages/Cart/Cart'));
const Login = lazy(() => import('../pages/Login/Login'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Overview = lazy(() => import('../pages/Dashboard/Overview'));
const Orders = lazy(() => import('../pages/Dashboard/Orders'));
const Wishlist = lazy(() => import('../pages/Wishlist/Wishlist'));
const Settings = lazy(() => import('../pages/Dashboard/Settings'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));
const Register = lazy(() => import('../pages/Register/Register'));

/* =====================
  CREATE BROWSER ROUTER
====================== */
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: '/product/:slug', element: <ProductDetail /> },
      { path: 'wishlist', element: <Wishlist /> },
      { path: 'cart', element: <Cart /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          { index: true, element: <Overview /> },
          { path: 'orders', element: <Orders /> },
          { path: 'settings', element: <Settings /> },
        ],
      },

      { path: '*', element: <NotFound /> },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
