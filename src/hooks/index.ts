import { useContext, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { TabsContext } from 'src/providers/TabsProvider';
import { tabs } from 'src/router/Router';
import { Device, Theme } from 'src/types';

export const useDevice = (): Device => {
  const [windowSize, setWindowSize] = useState<Device>({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobileLayout: window.innerWidth <= 850,
  });
  useEffect(() => {
    const handleResize = (): void => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobileLayout: window.innerWidth > 850,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return windowSize;
};

export const useKeydown = (key: string, onKeydown: () => void): void => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleKeydown = (e: KeyboardEvent): void => {
      if (e.key === key) onKeydown();
    };
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [onKeydown]);
};

const useThemeDetector = (): { isDark: boolean } => {
  const getCurrentTheme = (): boolean =>
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());
  const mqListener = (event: any): void => {
    setIsDarkTheme(event.matches);
  };

  useEffect(() => {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    darkThemeMq.addListener(mqListener);
    return () => {
      darkThemeMq.removeListener(mqListener);
    };
  }, []);
  return { isDark: isDarkTheme };
};

export const useCopyToClipboard = (): ((
  textToCopy: string,
  message?: string
) => void) => {
  const { enqueueSnackbar } = useSnackbar();
  return (textToCopy: string, message: string = 'Copied to Clipboard') => {
    console.log(message);
    enqueueSnackbar(message, { variant: 'info' });
    void navigator.clipboard.writeText(textToCopy);
  };
};

export const useTabs = (): {
  key: string;
  navigateTab: (key: string) => void;
  outlet: JSX.Element | undefined;
} => {
  const { key, setKey } = useContext(TabsContext);
  const navigateTab = (key: string): void => {
    setKey(key);
  };
  const tab = tabs.find((tab) => tab.key === key);
  return { navigateTab, outlet: tab?.element, key };
};

export const useTheme = (): {
  theme: Theme;
  toggleTheme: () => void;
} => {
  const systemTheme = useThemeDetector().isDark ? 'dark' : 'light';
  const localStorageTheme = window.localStorage.getItem(
    'theme'
  ) as Theme | null;

  const [animation, setAnimation] = useState(false);
  const [theme, setTheme] = useState<Theme>(localStorageTheme ?? systemTheme);

  useEffect(() => {
    document.documentElement.setAttribute('color-scheme', theme);
  }, []);

  const handleToggleTheme = (): void => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('color-scheme', newTheme);
    document.documentElement.classList.add('theme_transition');
    window.localStorage.setItem('theme', newTheme);
    setAnimation(true);
    setTheme(newTheme);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      document.documentElement.classList.remove('theme_transition');
      setAnimation(false);
    }, 250);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [animation]);
  return { theme, toggleTheme: handleToggleTheme };
};
