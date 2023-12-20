import React, { useEffect } from 'react';
import 'src/assets/styles/reset.scss';
import 'src/assets/styles/global.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from 'src/router/Router';
import { useAppSelector, useBoundActions } from 'src/app/hooks';
import { appActions } from 'src/slices/app/app.slice';
import { useGetUserMutation } from 'src/api/profileApi/profileApi';

const App: React.FC = () => {
  const initialized = useAppSelector((state) => state.app.initialized);
  const boundActions = useBoundActions(appActions);
  const [getUser] = useGetUserMutation();
  const tryGetUser = async (): Promise<void> => {
    try {
      const { user } = await getUser().unwrap();
      boundActions.setUser(user);
      boundActions.initialize();
    } catch (e) {
      boundActions.initialize();
    }
  };
  const init = async (): Promise<void> => {
    await tryGetUser();
  };
  useEffect(() => {
    void init();
  }, []);

  if (!initialized) return <h1>LOADING...</h1>;
  return <RouterProvider router={router} />;
};

export default App;
