import { useEffect } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { fetchRefreshToken } from '../features/auth/auth.actions';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { cookies } from '../utils/cookies';

const PrivateRoutes: React.FC = () => {
  const { accessToken } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const refreshToken = cookies.get('refreshToken');
    if (refreshToken) {
      dispatch(fetchRefreshToken(refreshToken));
    }
  }, [dispatch]);

  return accessToken ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
