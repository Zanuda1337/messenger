import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';

const PublicLayout: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.app.isLoggedIn);
  if (isLoggedIn) return <Navigate to={'/'} />;
  return <Outlet />;
};

export default PublicLayout;
