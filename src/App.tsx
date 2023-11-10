import React from 'react';
import 'src/assets/styles/reset.scss';
import 'src/assets/styles/global.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from 'src/router/Router';

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
