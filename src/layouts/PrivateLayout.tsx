import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useKeydown, useTabs } from 'src/hooks';
import { useHistory } from 'src/providers/HistoryProvider';
import SwipeBack from 'src/components/swipeBack/SwipeBack';

const PrivateLayout: React.FC = () => {
  const history = useHistory();
  const { key } = useTabs();
  const location = useLocation();

  useKeydown('Escape', () => {
    history.goBack();
  });

  return (
    <>
      {(key !== 'dialogs' || location.pathname !== '/') && <SwipeBack />}
      <Outlet />
    </>
  );
};

export default React.memo(PrivateLayout);
