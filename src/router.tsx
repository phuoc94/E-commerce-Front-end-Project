import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import HomePage from './pages';
import CardPage from './pages/CardPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';

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
        path: 'profile',
        element: <ProductPage />,
      },
      {
        path: 'cart',
        element: <CardPage />,
      },
    ],
  },
]);

export default router;
