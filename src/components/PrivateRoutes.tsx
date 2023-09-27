import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../hooks/useAppSelector';

type Auth = {
  token: boolean;
};

const PrivateRoutes: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth);

  const auth: Auth = {
    token: Boolean(token),
  };

  return auth.token ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
