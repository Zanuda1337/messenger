import React, { createContext, useState } from 'react';

interface TabsProviderProps {
  children: JSX.Element;
}

export interface Tab {
  key: string;
  element: JSX.Element;
  previous?: string;
}

export interface ITabsContext {
  key: string;
  setKey: React.Dispatch<React.SetStateAction<string>>;
}
export const TabsContext = createContext<ITabsContext>({
  key: 'dialogs',
  setKey: () => {},
});

const TabsProvider: React.FC<TabsProviderProps> = ({ children }) => {
  const [key, setKey] = useState('dialogs');
  return (
    <TabsContext.Provider value={{ key, setKey }}>
      {children}
    </TabsContext.Provider>
  );
};

export default TabsProvider;
