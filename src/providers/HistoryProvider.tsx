import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTabs } from 'src/hooks';
import { tabs } from 'src/router/Router';

interface HistoryProviderProps {
  children: JSX.Element;
}

interface HistoryObject {
  list: string[];
  changeHistory: (value: string[]) => void;
}

interface History extends Omit<HistoryObject, 'changeHistory'> {
  goBack: () => void;
}

export const HistoryContext = createContext<HistoryObject>({
  list: [],
  changeHistory: () => {},
});

const findNumber = (pathname: string): number | undefined => {
  const number = pathname.split('/').find((route) => {
    const possibleNumber = +route;
    return possibleNumber !== 0 && !isNaN(possibleNumber);
  });
  return number !== undefined ? +number : undefined;
};

export const useHistory = (): History => {
  const { list, changeHistory } = useContext(HistoryContext);
  const { key, navigateTab } = useTabs();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname !== list.at(-1)) {
      const id = findNumber(location.pathname);
      if (id === undefined) {
        changeHistory([...list, location.pathname]);
        return;
      }
      changeHistory([
        ...list.filter((pathname) => {
          const number = findNumber(pathname);
          if (number === undefined) return true;
          return id === number;
        }),
        location.pathname,
      ]);
    }
  }, [location, list]);
  return {
    goBack: () => {
      if (key !== 'dialogs') {
        const tab = tabs.find((tab) => tab.key === key);
        if (tab?.previous === undefined) return;
        navigateTab(tab.previous);
        return;
      }
      if (location.pathname === '/') {
        return;
      }
      if (list.length === 1) {
        const routes = list[0].split('/');
        if (routes.length === 1) {
          return;
        }
        const path = routes.slice(0, -1).join('/');
        navigate(path === '' ? '/' : path, { replace: true });
        changeHistory(list.slice(0, -1));
        return;
      }
      changeHistory(list.slice(0, -1));
      navigate(list.slice(0, -1).at(-1) ?? '/', { replace: true });
    },
    list,
  };
};

const HistoryProvider: React.FC<HistoryProviderProps> = ({ children }) => {
  const [history, setHistory] = useState<string[]>([]);
  const changeHistory = (value: string[]): void => {
    setHistory(value);
  };
  const value: HistoryObject = {
    list: history,
    changeHistory,
  };
  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
};

export default HistoryProvider;
