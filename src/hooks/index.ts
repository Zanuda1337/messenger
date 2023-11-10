import { useEffect, useState } from 'react';

export const useDevice = (): { width: number; height: number } => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = (): void => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
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
    const handleKeydown = (e: KeyboardEvent): void => {
      if (e.key === key) onKeydown();
    };
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [onKeydown]);
};

export const useThemeDetector = (): { isDark: boolean } => {
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
