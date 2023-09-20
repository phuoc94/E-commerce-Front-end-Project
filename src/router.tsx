import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import HomePage from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
