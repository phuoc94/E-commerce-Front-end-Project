import { createBrowserRouter } from 'react-router-dom';

import Layout from '../layouts/Layout';
import HomePage from '../pages';
import CardPage from '../pages/CardPage';
import CategoryPage from '../pages/CategoryPage';
import ProductPage from '../pages/products/ProductPage';
import ProductsPage from '../pages/products/ProductsPage';
import ProfilePage from '../pages/ProfilePage';
import SignIn from '../pages/SignIn';
import PrivateRoutes from './PrivateRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'category/:category',
        element: <CategoryPage />,
      },
      {
        path: 'product/:productId',
        element: <ProductPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: '/profile',
        element: <PrivateRoutes />,
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: 'cart',
        element: <CardPage />,
      },
    ],
  },
  {
    path: 'signin',
    element: <SignIn />,
  },
]);

export default router;
