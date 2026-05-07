import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';

interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
}

const themes: Theme[] = [
  {
    id: 'glass',
    name: '现代玻璃',
    description: '毛玻璃效果，柔和配色',
    preview: 'from-slate-50 via-indigo-50/30 to-purple-50/20'
  },
  {
    id: 'tech',
    name: '科技深色',
    description: '赛博风格，深邃暗色',
    preview: 'from-slate-900 via-slate-800 to-slate-900'
  }
];

interface ThemeSwitcherProps {
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
}

export function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Palette className="w-4 h-4 text-indigo-600" />
        <span className="text-sm font-medium text-slate-700">风格</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-72 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 z-50 p-4"
            >
              <div className="text-sm font-semibold text-slate-800 mb-3">选择风格</div>
              <div className="space-y-2">
                {themes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    onClick={() => {
                      onThemeChange(theme.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      currentTheme === theme.id
                        ? 'bg-indigo-50 border border-indigo-200'
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${theme.preview} shadow-inner`} />
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-slate-800">{theme.name}</div>
                      <div className="text-xs text-slate-500">{theme.description}</div>
                    </div>
                    {currentTheme === theme.id && (
                      <Check className="w-4 h-4 text-indigo-600" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
