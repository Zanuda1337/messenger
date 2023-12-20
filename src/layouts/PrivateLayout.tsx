// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useKeydown, useTabs } from 'src/hooks';
import { useHistory } from 'src/providers/HistoryProvider';
import SwipeBack from 'src/components/swipeBack/SwipeBack';
import { useAppSelector } from 'src/app/hooks';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { io, Socket } from 'socket.io-client';

const PrivateLayout: React.FC = () => {
  const history = useHistory();
  const { key } = useTabs();
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [socket, setSocket] = useState<Socket | null>(null);
  const isLoggedIn = useAppSelector((state) => state.app.isLoggedIn);

  useKeydown('Escape', () => {
    history.goBack();
  });

  useEffect(() => {
    const newSocket = io('http://localhost:5000', { withCredentials: true });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  if (!isLoggedIn) return <Navigate to={'/auth'} />;

  return (
    <>
      {(key !== 'root' || location.pathname !== '/') && <SwipeBack />}
      <Outlet />
    </>
  );
};

export default React.memo(PrivateLayout);
