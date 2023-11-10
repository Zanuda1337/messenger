import React from 'react';
import { Outlet } from 'react-router-dom';

const PrivateLayout: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateLayout;
