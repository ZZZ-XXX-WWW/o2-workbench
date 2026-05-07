import React from 'react';
import { Sun, Moon, Leaf, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

type Theme = 'light' | 'dark' | 'fresh' | 'warm';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const themes: { id: Theme; label: string; icon: typeof Sun; color: string }[] = [
  { id: 'light', label: '浅色', icon: Sun, color: '#f59e0b' },
  { id: 'dark', label: '深色', icon: Moon, color: '#6366f1' },
  { id: 'fresh', label: '清新', icon: Leaf, color: '#10b981' },
  { id: 'warm', label: '暖色', icon: Flame, color: '#f97316' },
];

export default function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  return (
    <div className="flex items-center gap-1 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
      {themes.map((theme) => {
        const Icon = theme.icon;
        const isActive = currentTheme === theme.id;
        return (
          <motion.button
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.div
                layoutId="activeTheme"
                className="absolute inset-0 rounded-lg"
                style={{ backgroundColor: theme.color }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Icon size={14} />
              <span className="hidden sm:inline">{theme.label}</span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
