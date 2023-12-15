import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Chat from 'src/features/chat/Chat';
import Messenger from 'src/features/messenger/Messenger';
import PrivateLayout from 'src/layouts/PrivateLayout';
import React from 'react';
import RightSide from 'src/layouts/rightSide/RightSide';
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
import UserTab from 'src/features/chat/user/UserTab';
import UserEdit from 'src/features/tabs/userEdit/UserEdit';
import Edit from 'src/features/chat/user/Edit';

export const rightSideRoutes = [
  {
    path: 'search',
    element: Search,
  },
  {
    path: 'user',
    element: UserTab,
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
    key: 'user_edit',
    element: <UserEdit />,
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
