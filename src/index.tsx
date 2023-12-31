import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { SnackbarProvider } from 'notistack';
import Info from 'src/components/snackbar/Info';
import TabsProvider from 'src/providers/TabsProvider';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      preventDuplicate
      autoHideDuration={3000}
      classes={{ root: 'snackbar-container' }}
      Components={{ info: Info }}
    >
      <TabsProvider>
        <App />
      </TabsProvider>
    </SnackbarProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
