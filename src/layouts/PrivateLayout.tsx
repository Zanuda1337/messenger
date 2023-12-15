import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useKeydown, useTabs } from 'src/hooks';
import { useHistory } from 'src/providers/HistoryProvider';
import SwipeBack from 'src/components/swipeBack/SwipeBack';
import { useAppSelector } from 'src/app/hooks';

const PrivateLayout: React.FC = () => {
  const history = useHistory();
  const { key } = useTabs();
  const location = useLocation();
  const isLoggedIn = useAppSelector((state) => state.app.isLoggedIn);

  useKeydown('Escape', () => {
    history.goBack();
  });

  if (!isLoggedIn) return <Navigate to={'/auth'} />;

  return (
    <>
      {(key !== 'dialogs' || location.pathname !== '/') && <SwipeBack />}
      <Outlet />
    </>
  );
};

export default React.memo(PrivateLayout);
