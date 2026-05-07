import { useState, useEffect, useCallback } from 'react';

type ThemeStyle = 'glass' | 'tech';

interface ThemeState {
  style: ThemeStyle;
  isDark: boolean;
}

const STORAGE_KEY = 'product-search-theme';

const defaultTheme: ThemeState = {
  style: 'glass',
  isDark: false
};

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeState>(defaultTheme);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setThemeState({ ...defaultTheme, ...parsed });
      } catch {
        setThemeState(defaultTheme);
      }
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setThemeState(prev => ({ ...prev, isDark: e.matches }));
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
    document.documentElement.setAttribute('data-theme', theme.style);
    document.documentElement.classList.toggle('dark', theme.isDark);
  }, [theme]);

  const setStyle = useCallback((style: ThemeStyle) => {
    setIsAnimating(true);
    setThemeState(prev => ({ ...prev, style }));
    setTimeout(() => setIsAnimating(false), 300);
  }, []);

  const toggleDark = useCallback(() => {
    setThemeState(prev => ({ ...prev, isDark: !prev.isDark }));
  }, []);

  const cycleStyle = useCallback(() => {
    const styles: ThemeStyle[] = ['glass', 'tech'];
    const currentIndex = styles.indexOf(theme.style);
    const nextIndex = (currentIndex + 1) % styles.length;
    setStyle(styles[nextIndex]);
  }, [theme.style, setStyle]);

  return {
    style: theme.style,
    isDark: theme.isDark,
    isAnimating,
    setStyle,
    toggleDark,
    cycleStyle
  };
}
