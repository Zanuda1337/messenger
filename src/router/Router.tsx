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
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<PrivateLayout />}>
      <Route path="/" element={<Messenger />}>
        <Route path={':id'} element={<Chat />}>
          <Route path={'user'} element={<User />} />
          <Route path={'user/edit'} element={<div>loh</div>} />
        </Route>
      </Route>
    </Route>
  )
);
