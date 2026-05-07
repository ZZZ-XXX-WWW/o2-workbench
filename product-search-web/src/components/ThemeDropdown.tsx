import React, { useEffect, useRef, useState } from 'react';

type ThemeStyle = 'glass' | 'tech';

interface ThemeDropdownProps {
  currentTheme: ThemeStyle;
  show: boolean;
  onClose: () => void;
  onSelect: (theme: ThemeStyle) => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

const themes: Record<ThemeStyle, { name: string; icon: string; desc: string }> = {
  glass: { name: '现代玻璃', icon: '✨', desc: '毛玻璃效果' },
  tech: { name: '科技深色', icon: '⚡', desc: '赛博风格' }
};

export function ThemeDropdown({ currentTheme, show, onClose, onSelect, buttonRef }: ThemeDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (show && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right
      });
    }
  }, [show, buttonRef]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
          onClose();
        }
      }
    };
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [show, onClose, buttonRef]);

  if (!show) return null;

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'fixed',
        top: position.top,
        right: position.right,
        zIndex: 2147483647,
        width: '192px'
      }}
      className={`rounded-xl shadow-2xl ${
        currentTheme === 'tech'
          ? 'bg-slate-800 border border-cyan-500/30'
          : 'bg-white border border-gray-200'
      }`}
    >
      {(Object.keys(themes) as ThemeStyle[]).map((t) => (
        <button
          key={t}
          onClick={() => onSelect(t)}
          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all first:rounded-t-xl last:rounded-b-xl ${
            currentTheme === t
              ? currentTheme === 'tech'
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'bg-indigo-50 text-indigo-600'
              : currentTheme === 'tech'
              ? 'text-cyan-200 hover:bg-cyan-500/10'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span className="text-lg">{themes[t].icon}</span>
          <div>
            <div className="font-medium text-sm">{themes[t].name}</div>
            <div className={`text-xs ${currentTheme === 'tech' ? 'text-cyan-400/60' : 'text-gray-400'}`}>
              {themes[t].desc}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
