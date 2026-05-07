import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'fresh' | 'warm';

const themeColors = {
  light: {
    '--bg-primary': '#ffffff',
    '--bg-secondary': '#f5f5f5',
    '--bg-card': '#ffffff',
    '--text-primary': '#1a1a1a',
    '--text-secondary': '#666666',
    '--border-color': '#e5e5e5',
    '--accent-color': '#3b82f6',
    '--accent-hover': '#2563eb',
    '--success-color': '#22c55e',
    '--warning-color': '#f59e0b',
    '--error-color': '#ef4444',
  },
  dark: {
    '--bg-primary': '#0f0f0f',
    '--bg-secondary': '#1a1a1a',
    '--bg-card': '#1e1e1e',
    '--text-primary': '#ffffff',
    '--text-secondary': '#a1a1aa',
    '--border-color': '#27272a',
    '--accent-color': '#60a5fa',
    '--accent-hover': '#3b82f6',
    '--success-color': '#4ade80',
    '--warning-color': '#fbbf24',
    '--error-color': '#f87171',
  },
  fresh: {
    '--bg-primary': '#f0fdf4',
    '--bg-secondary': '#dcfce7',
    '--bg-card': '#ffffff',
    '--text-primary': '#14532d',
    '--text-secondary': '#166534',
    '--border-color': '#bbf7d0',
    '--accent-color': '#22c55e',
    '--accent-hover': '#16a34a',
    '--success-color': '#22c55e',
    '--warning-color': '#eab308',
    '--error-color': '#ef4444',
  },
  warm: {
    '--bg-primary': '#fff7ed',
    '--bg-secondary': '#ffedd5',
    '--bg-card': '#ffffff',
    '--text-primary': '#7c2d12',
    '--text-secondary': '#9a3412',
    '--border-color': '#fed7aa',
    '--accent-color': '#f97316',
    '--accent-hover': '#ea580c',
    '--success-color': '#22c55e',
    '--warning-color': '#f59e0b',
    '--error-color': '#ef4444',
  },
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme;
    if (saved && themeColors[saved]) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const colors = themeColors[theme];
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, []);

  return { theme, toggleTheme, themes: Object.keys(themeColors) as Theme[] };
}
