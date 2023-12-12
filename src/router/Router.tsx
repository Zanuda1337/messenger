// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Messenger from 'src/features/messenger/Messenger';
// import PrivateLayout from 'src/layouts/PrivateLayout';
//
// const Router: React.FC = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<PrivateLayout />}>
//           <Route path={'/*'} element={<Messenger />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };
//
// export default Router;

import { createRef } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Chat from 'src/features/chat/Chat';
import Messenger from 'src/features/messenger/Messenger';
import PrivateLayout from 'src/layouts/PrivateLayout';
import React from 'react';
import User from 'src/features/chat/user/User';
import RightSide from 'src/layouts/rightSide/RightSide';
import Edit from 'src/features/chat/user/edit/Edit';
import Search from 'src/features/chat/search/Search';
import HistoryProvider from 'src/providers/HistoryProvider';
import Dialogs from 'src/features/tabs/dialogs/Dialogs';
import Settings from 'src/features/tabs/settings/Settings';
import GeneralSettings from 'src/features/tabs/generalSettings/GeneralSettings';
import { Tab } from 'src/providers/TabsProvider';
import Notifications from 'src/features/tabs/notifications/Notifications';
import Privacy from 'src/features/tabs/privacy/Privacy';
import PrivacyEdit from 'src/features/tabs/privacyEdit/PrivacyEdit';
import Language from 'src/features/tabs/language/Language';
import PublicLayout from 'src/layouts/PublicLayout';
import Auth from 'src/features/auth/Auth';

export const routes = [
  // {
  //   path: '/',
  //   name: 'Dialogs',
  //   element: <Dialogs />,
  //   nodeRef: createRef(),
  //   type: 'left',
  // },
  {
    path: '/:id',
    name: 'Chat',
    element: <Chat />,
    children: [
      {
        path: 'user',
        name: 'User',
        element: <User />,
        nodeRef: createRef(),
      },
      // {
      //   path: 'user/edit',
      //   name: 'Edit',
      //   element: <Chat />,
      //   nodeRef: createRef(),
      // },
    ],
    nodeRef: createRef(),
  },
];

// export const router = createBrowserRouter([
//   {
//     element: <PrivateLayout />,
//     children: [
//       {
//         path: '/',
//         element: <Messenger />,
//         children: routes.map((route) => ({
//           index: route.path === '/',
//           path: route.path === '/' ? undefined : route.path,
//           element: route.element,
//         })),
//       },
//     ],
//   },
// ]);

export const rightSideRoutes = [
  {
    path: 'search',
    element: Search,
  },
  {
    path: 'user',
    element: User,
  },
  {
    path: 'user/edit',
    element: Edit,
  },
];

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicLayout />}>
        <Route path={'/auth'} element={<Auth />} />
      </Route>
      <Route
        element={
          <HistoryProvider>
            <PrivateLayout />
          </HistoryProvider>
        }
      >
        <Route path="/" element={<Messenger />}>
          <Route path={':id'} element={<Chat />}>
            <Route element={<RightSide />}>
              {rightSideRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.element />}
                />
              ))}
            </Route>
          </Route>
        </Route>
      </Route>
    </>
  )
);

export const tabs: Tab[] = [
  {
    key: 'dialogs',
    element: <Dialogs />,
  },
  {
    key: 'settings',
    element: <Settings />,
    previous: 'dialogs',
  },
  {
    key: 'general_settings',
    element: <GeneralSettings />,
    previous: 'settings',
  },
  {
    key: 'notifications',
    element: <Notifications />,
    previous: 'settings',
  },
  {
    key: 'privacy',
    element: <Privacy />,
    previous: 'settings',
  },
  {
    key: 'privacy_edit',
    element: <PrivacyEdit />,
    previous: 'privacy',
  },
  {
    key: 'language',
    element: <Language />,
    previous: 'settings',
  },
];
