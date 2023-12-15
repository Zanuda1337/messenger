import React, { useEffect } from 'react';
import 'src/assets/styles/reset.scss';
import 'src/assets/styles/global.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from 'src/router/Router';
import { useAppSelector, useBoundActions } from 'src/app/hooks';
import { initializeAsync } from 'src/app/app.slice';

const App: React.FC = () => {
  const initialized = useAppSelector((state) => state.app.initialized);
  const boundActions = useBoundActions({ initializeAsync });
  useEffect(() => {
    void boundActions.initializeAsync();
  }, []);

  if (!initialized) return <h1>LOADING...</h1>;
  return <RouterProvider router={router} />;
};

export default App;
