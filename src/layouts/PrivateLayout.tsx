import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useKeydown } from 'src/hooks';

const PrivateLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useKeydown('Escape', () => {
    navigate(location.pathname.split('/').slice(0, -1).join('/'));
  });
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateLayout;
