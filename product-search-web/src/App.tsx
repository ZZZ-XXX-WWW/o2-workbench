import React, { useState, useRef, useEffect } from 'react';
import { Upload, Search, FolderOpen, Plus, Settings, ImageIcon, Palette, ChevronDown, ChevronUp, X, Pencil, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeDropdown } from './components/ThemeDropdown';

const API = '';  // Same origin (Vite proxy -> :8527)

type ThemeStyle = 'glass' | 'warm' | 'tech' | 'forest' | 'ocean' | 'rose' | 'midnight' | 'coffee' | 'mint' | 'lavender' | 'sunset' | 'cherry' | 'arctic';

interface Product {
  id: string;
  image: string;
  date: string;
  factory: string;
  address: string;
  link: string;
  cost: string;
  note: string;
  model?: string;
  shipping?: string;
  color?: string;
  size?: string;
  score?: number;
  dist1_price?: string;
  dist1_ship?: string;
  dist1_note?: string;
  dist2_price?: string;
  dist2_ship?: string;
  dist2_note?: string;
  images?: string[];
}

const themes: Record<ThemeStyle, { name: string; icon: string; desc: string }> = {
  glass: { name: '现代玻璃', icon: '🔍', desc: '毛玻璃效果' },
  warm: { name: '温暖奶油', icon: '🌅', desc: '柔和暖色' },
  tech: { name: '科技深色', icon: '💻', desc: '赛博风格' },
  forest: { name: '森林自然', icon: '🌲', desc: '清新绿色' },
  ocean: { name: '海洋深蓝', icon: '🌊', desc: '深邃蓝色' },
  rose: { name: '玫瑰粉金', icon: '🌹', desc: '浪漫粉色' },
  midnight: { name: '午夜紫黑', icon: '🌙', desc: '神秘暗紫' },
  coffee: { name: '咖啡摩卡', icon: '☕', desc: '温暖棕色' },
  mint: { name: '薄荷清凉', icon: '🍃', desc: '清新薄荷' },
  lavender: { name: '薰衣草紫', icon: '💜', desc: '优雅淡紫' },
  sunset: { name: '日落橙红', icon: '🌇', desc: '热情渐变' },
  cherry: { name: '樱桃红粉', icon: '🍒', desc: '甜美红色' },
  arctic: { name: '北极冰川', icon: '❄️', desc: '冷冽青白' }
};

function App() {
  const [currentTheme, setCurrentTheme] = useState<ThemeStyle>('glass');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchImage, setSearchImage] = useState<string | null>(null);
  const [searchFile, setSearchFile] = useState<File | null>(null);
  const [uploadImages, setUploadImages] = useState<string[]>([]);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [rerank, setRerank] = useState(false);
  const [returnCount, setReturnCount] = useState(10);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchStatus, setSearchStatus] = useState('');
  const [manageProducts, setManageProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({ date: '', factory: '', model: '', address: '', link: '', cost: '', shipping: '', color: '', size: '', note: '', distributors: [{ name: '', price: '', ship: '', note: '' }] });
  const [showMoreFields, setShowMoreFields] = useState(false);
  const [showManageDb, setShowManageDb] = useState(false);
  const [manageSearch, setManageSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ factory: '', model: '', cost: '', shipping: '', color: '', size: '', note: '', date: '', address: '', link: '' });

  const searchInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const remarkImgInputRef = useRef<HTMLInputElement>(null);
  const [uploadingRemarkImg, setUploadingRemarkImg] = useState(false);
  const themeButtonRef = useRef<HTMLButtonElement>(null);

  const getThemeClasses = () => {
    switch (currentTheme) {
      case 'warm':
        return {
          bg: 'min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50',
          header: 'bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 text-white px-4 py-3 flex items-center justify-between shadow-lg',
          card: 'w-72 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-orange-100 p-4',
          cardRight: 'flex-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-orange-100 p-4',
          uploadZone: 'border-2 border-dashed border-orange-200 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer bg-orange-50/50 hover:bg-orange-100/50 hover:border-orange-400 transition-all',
          input: 'flex-1 px-2 py-1.5 text-xs bg-white/70 border border-orange-200 rounded focus:outline-none focus:border-orange-400',
          btnGreen: 'w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnPurple: 'w-full py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnBlue: 'flex-1 py-2 bg-gradient-to-r from-orange-400 to-amber-400 text-white rounded-md text-sm font-medium shadow-sm',
          btnOrange: 'flex-1 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-md text-sm font-medium shadow-sm'
        };
      case 'tech':
        return {
          bg: 'min-h-screen bg-slate-950',
          header: 'bg-slate-900 border-b border-cyan-500/30 text-cyan-400 px-4 py-3 flex items-center justify-between shadow-lg shadow-cyan-500/10',
          card: 'w-72 bg-slate-900/80 border border-cyan-500/30 rounded-lg p-4 shadow-sm',
          cardRight: 'flex-1 bg-slate-900/80 border border-cyan-500/30 rounded-lg p-4 shadow-sm',
          uploadZone: 'border-2 border-dashed border-cyan-500/40 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer bg-slate-800/50 hover:border-cyan-400 hover:bg-cyan-950/30 transition-all',
          input: 'flex-1 px-2 py-1.5 text-xs bg-slate-800 border border-cyan-500/30 rounded text-cyan-100 focus:outline-none focus:border-cyan-400',
          btnGreen: 'w-full py-2 bg-cyan-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-cyan-500',
          btnPurple: 'w-full py-2 bg-violet-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-violet-500',
          btnBlue: 'flex-1 py-2 bg-cyan-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-cyan-500',
          btnOrange: 'flex-1 py-2 bg-fuchsia-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-fuchsia-500'
        };
      case 'forest':
        return {
          bg: 'min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50',
          header: 'bg-emerald-700 text-white px-4 py-3 flex items-center justify-between shadow-lg',
          card: 'w-72 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-emerald-100 p-4',
          cardRight: 'flex-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-emerald-100 p-4',
          uploadZone: 'border-2 border-dashed border-emerald-300 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer bg-emerald-50/50 hover:bg-emerald-100/50 hover:border-emerald-500 transition-all',
          input: 'flex-1 px-2 py-1.5 text-xs bg-white/70 border border-emerald-200 rounded focus:outline-none focus:border-emerald-500',
          btnGreen: 'w-full py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-md text-sm font-medium shadow-sm',
          btnPurple: 'w-full py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnBlue: 'flex-1 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnOrange: 'flex-1 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-md text-sm font-medium shadow-sm'
        };
      case 'ocean':
        return {
          bg: 'min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50',
          header: 'bg-blue-700 text-white px-4 py-3 flex items-center justify-between shadow-lg',
          card: 'w-72 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-blue-100 p-4',
          cardRight: 'flex-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-blue-100 p-4',
          uploadZone: 'border-2 border-dashed border-blue-300 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer bg-blue-50/50 hover:bg-blue-100/50 hover:border-blue-500 transition-all',
          input: 'flex-1 px-2 py-1.5 text-xs bg-white/70 border border-blue-200 rounded focus:outline-none focus:border-blue-500',
          btnGreen: 'w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-md text-sm font-medium shadow-sm',
          btnPurple: 'w-full py-2 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnBlue: 'flex-1 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnOrange: 'flex-1 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 text-white rounded-md text-sm font-medium shadow-sm'
        };
      case 'rose':
        return {
          bg: 'min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50',
          header: 'bg-rose-600 text-white px-4 py-3 flex items-center justify-between shadow-lg',
          card: 'w-72 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-rose-100 p-4',
          cardRight: 'flex-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-rose-100 p-4',
          uploadZone: 'border-2 border-dashed border-rose-300 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer bg-rose-50/50 hover:bg-rose-100/50 hover:border-rose-500 transition-all',
          input: 'flex-1 px-2 py-1.5 text-xs bg-white/70 border border-rose-200 rounded focus:outline-none focus:border-rose-500',
          btnGreen: 'w-full py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnPurple: 'w-full py-2 bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnBlue: 'flex-1 py-2 bg-gradient-to-r from-rose-400 to-pink-400 text-white rounded-md text-sm font-medium shadow-sm',
          btnOrange: 'flex-1 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-md text-sm font-medium shadow-sm'
        };
      case 'midnight':
        return {
          bg: 'min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-950',
          header: 'bg-slate-950 border-b border-purple-500/30 text-purple-300 px-4 py-3 flex items-center justify-between shadow-lg shadow-purple-500/10',
          card: 'w-72 bg-slate-900/90 border border-purple-500/30 rounded-lg p-4 shadow-sm',
          cardRight: 'flex-1 bg-slate-900/90 border border-purple-500/30 rounded-lg p-4 shadow-sm',
          uploadZone: 'border-2 border-dashed border-purple-500/40 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer bg-slate-800/50 hover:border-purple-400 hover:bg-purple-950/30 transition-all',
          input: 'flex-1 px-2 py-1.5 text-xs bg-slate-800 border border-purple-500/30 rounded text-purple-100 focus:outline-none focus:border-purple-400',
          btnGreen: 'w-full py-2 bg-purple-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-purple-500',
          btnPurple: 'w-full py-2 bg-indigo-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-indigo-500',
          btnBlue: 'flex-1 py-2 bg-purple-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-purple-500',
          btnOrange: 'flex-1 py-2 bg-fuchsia-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-fuchsia-500'
        };
      case 'coffee':
        return {
          bg: 'min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50',
          header: 'bg-amber-800 text-white px-4 py-3 flex items-center justify-between shadow-lg',
          card: 'w-72 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-amber-100 p-4',
          cardRight: 'flex-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-amber-100 p-4',
          uploadZone: 'border-2 border-dashed border-amber-300 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer bg-amber-50/50 hover:bg-amber-100/50 hover:border-amber-500 transition-all',
          input: 'flex-1 px-2 py-1.5 text-xs bg-white/70 border border-amber-200 rounded focus:outline-none focus:border-amber-500',
          btnGreen: 'w-full py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-md text-sm font-medium shadow-sm',
          btnPurple: 'w-full py-2 bg-gradient-to-r from-stone-500 to-amber-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnBlue: 'flex-1 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnOrange: 'flex-1 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-md text-sm font-medium shadow-sm'
        };
      case 'mint':
        return {
          bg: 'min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50',
          header: 'bg-teal-600 text-white px-4 py-3 flex items-center justify-between shadow-lg',
          card: 'w-72 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-teal-100 p-4',
          cardRight: 'flex-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-teal-100 p-4',
          uploadZone: 'border-2 border-dashed border-teal-300 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer bg-teal-50/50 hover:bg-teal-100/50 hover:border-teal-500 transition-all',
          input: 'flex-1 px-2 py-1.5 text-xs bg-white/70 border border-teal-200 rounded focus:outline-none focus:border-teal-500',
          btnGreen: 'w-full py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnPurple: 'w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnBlue: 'flex-1 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnOrange: 'flex-1 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-md text-sm font-medium shadow-sm'
        };
      case 'lavender':
        return {
          bg: 'min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50',
          header: 'bg-violet-600 text-white px-4 py-3 flex items-center justify-between shadow-lg',
          card: 'w-72 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-violet-100 p-4',
          cardRight: 'flex-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-violet-100 p-4',
          uploadZone: 'border-2 border-dashed border-violet-300 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer bg-violet-50/50 hover:bg-violet-100/50 hover:border-violet-500 transition-all',
          input: 'flex-1 px-2 py-1.5 text-xs bg-white/70 border border-violet-200 rounded focus:outline-none focus:border-violet-500',
          btnGreen: 'w-full py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnPurple: 'w-full py-2 bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnBlue: 'flex-1 py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnOrange: 'flex-1 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-md text-sm font-medium shadow-sm'
        };
      case 'sunset':
        return {
          bg: 'min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50',
          header: 'bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 text-white px-4 py-3 flex items-center justify-between shadow-lg',
          card: 'w-72 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-orange-100 p-4',
          cardRight: 'flex-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-orange-100 p-4',
          uploadZone: 'border-2 border-dashed border-orange-300 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer bg-orange-50/50 hover:bg-orange-100/50 hover:border-orange-500 transition-all',
          input: 'flex-1 px-2 py-1.5 text-xs bg-white/70 border border-orange-200 rounded focus:outline-none focus:border-orange-500',
          btnGreen: 'w-full py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnPurple: 'w-full py-2 bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnBlue: 'flex-1 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnOrange: 'flex-1 py-2 bg-gradient-to-r from-red-500 to-amber-500 text-white rounded-md text-sm font-medium shadow-sm'
        };
      case 'cherry':
        return {
          bg: 'min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50',
          header: 'bg-rose-700 text-white px-4 py-3 flex items-center justify-between shadow-lg',
          card: 'w-72 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-rose-100 p-4',
          cardRight: 'flex-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-rose-100 p-4',
          uploadZone: 'border-2 border-dashed border-rose-300 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer bg-rose-50/50 hover:bg-rose-100/50 hover:border-rose-500 transition-all',
          input: 'flex-1 px-2 py-1.5 text-xs bg-white/70 border border-rose-200 rounded focus:outline-none focus:border-rose-500',
          btnGreen: 'w-full py-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-md text-sm font-medium shadow-sm',
          btnPurple: 'w-full py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnBlue: 'flex-1 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnOrange: 'flex-1 py-2 bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-md text-sm font-medium shadow-sm'
        };
      case 'arctic':
        return {
          bg: 'min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-sky-50',
          header: 'bg-slate-700 text-white px-4 py-3 flex items-center justify-between shadow-lg',
          card: 'w-72 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-slate-100 p-4',
          cardRight: 'flex-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-slate-100 p-4',
          uploadZone: 'border-2 border-dashed border-slate-300 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 hover:bg-cyan-50/50 hover:border-cyan-400 transition-all',
          input: 'flex-1 px-2 py-1.5 text-xs bg-white/70 border border-slate-200 rounded focus:outline-none focus:border-cyan-400',
          btnGreen: 'w-full py-2 bg-gradient-to-r from-cyan-600 to-sky-600 text-white rounded-md text-sm font-medium shadow-sm',
          btnPurple: 'w-full py-2 bg-gradient-to-r from-slate-500 to-cyan-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnBlue: 'flex-1 py-2 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-md text-sm font-medium shadow-sm',
          btnOrange: 'flex-1 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 text-white rounded-md text-sm font-medium shadow-sm'
        };
      default:
        return {
          bg: 'min-h-screen bg-[#f5f7fa]',
          header: 'bg-gradient-to-r from-sky-400 to-teal-400 text-white px-4 py-3 flex items-center justify-between shadow-lg',
          card: 'w-72 bg-white rounded-lg shadow-sm border border-gray-100 p-4',
          cardRight: 'flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-4',
          uploadZone: 'border-2 border-dashed border-gray-200 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-all',
          input: 'flex-1 px-2 py-1.5 text-xs bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
          btnGreen: 'w-full py-2 bg-[#1677ff] text-white rounded-md text-sm font-medium hover:bg-[#4096ff] transition-colors',
          btnPurple: 'w-full py-2 bg-[#722ed1] text-white rounded-md text-sm font-medium hover:bg-[#9254de] transition-colors',
          btnBlue: 'flex-1 py-2 bg-[#1677ff] text-white rounded-md text-sm font-medium hover:bg-[#4096ff] transition-colors',
          btnOrange: 'flex-1 py-2 bg-[#fa8c16] text-white rounded-md text-sm font-medium hover:bg-[#ffa940] transition-colors'
        };
    }
  };

  const theme = getThemeClasses();

  const handleSearchImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSearchFile(file);
      const reader = new FileReader();
      reader.onload = (event) => setSearchImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    setUploadFiles(fileArray);
    Promise.all(fileArray.map(f => new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = (ev) => resolve(ev.target?.result as string);
      reader.readAsDataURL(f);
    }))).then(results => setUploadImages(results));
  };

  const handleAddProduct = async () => {
    if (!uploadImages.length || !uploadFiles.length) return;
    const form = new FormData();
    uploadFiles.forEach(f => form.append('files', f));
    const fieldMap: Record<string, string> = {
      date: 'inquiry_date', factory: 'manufacturer_name', model: 'manufacturer_code',
      address: 'address', link: 'manufacturer_link',
      cost: 'cost_price', shipping: 'shipping_fee',
      color: 'color', size: 'size', note: 'remarks',

    };
    Object.entries(formData).forEach(([k, v]) => {
      form.append(fieldMap[k] || k, v);
    });
    try {
      const res = await fetch(`${API}/api/products/upload`, { method: 'POST', body: form });
      const d = await res.json();
      if (d.ok) {
        const p = d.product;
        for (const dist of formData.distributors) {
          if (dist.name || dist.price) {
            await fetch(`${API}/api/products/${p.id}/distributor-price`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                distributor_key: 'dist_' + Date.now() + '_' + Math.random().toString(36).slice(2,6),
                distributor_name: dist.name,
                base_price: parseFloat(dist.price) || 0,
                shipping_fee: parseFloat(dist.ship) || 0,
                total_price: (parseFloat(dist.price) || 0) + (parseFloat(dist.ship) || 0),
                remarks: dist.note,
              }),
            });
          }
        }
        const newProduct: Product = {
          id: p.id, image: `${API}/api/products/image/${p.id}`,
          images: p.image_urls || [],
          date: p.inquiry_date || '', factory: p.manufacturer_name || '', model: p.manufacturer_code,
          address: p.address || '', link: p.manufacturer_link || '',
          cost: String(p.cost_price || ''), note: p.remarks || '',
          shipping: String(p.shipping_fee || ''), color: p.color, size: p.size,
        };
        setProducts(prev => [...prev, newProduct]);
        setUploadImages([]); setUploadFiles([]);
        setFormData({ date: '', factory: '', model: '', address: '', link: '', cost: '', shipping: '', color: '', size: '', note: '', distributors: [{ name: '', price: '', ship: '', note: '' }] });
        if (uploadInputRef.current) uploadInputRef.current.value = '';
        loadProducts();
      }
    } catch (e) {
      console.error('Add failed:', e);
    }
  };

  const handleSearch = async () => {
    if (!searchImage || !searchFile) return;
    setIsSearching(true);
    setSearchStatus('搜索中...');
    setSearchResults([]);
    const form = new FormData();
    form.append('file', searchFile);
    form.append('top_k', String(returnCount));
    try {
      const res = await fetch(`${API}/api/products/search`, { method: 'POST', body: form });
      if (!res.ok) { setSearchStatus('搜索失败: ' + res.status); setIsSearching(false); return; }
      const d = await res.json();
      const items = (d.results || []).map((p: any) => ({
        id: p.id, image: `${API}/api/products/image/${p.id}`,
        images: p.image_urls || [],
        images: p.image_urls || [],
        date: p.inquiry_date || '', factory: p.manufacturer_name || '',
        model: p.manufacturer_code, address: p.address || '',
        link: p.manufacturer_link || '', cost: String(p.cost_price || ''),
        note: p.remarks || '', shipping: String(p.shipping_fee || ''),
        color: p.color, size: p.size, score: p.score,
        dist1_name: p.dist1_name || '', dist1_price: p.dist1_base_price || '', dist1_ship: p.dist1_shipping_fee || '', dist1_note: p.dist1_remarks || '',
        dist2_name: p.dist2_name || '', dist2_price: p.dist2_base_price || '', dist2_ship: p.dist2_shipping_fee || '', dist2_note: p.dist2_remarks || '',
      }));
      setSearchResults(items);
      setSearchStatus(items.length > 0 ? `找到 ${items.length} 个相似商品` : '未找到相似商品');
    } catch (e) {
      console.error('Search failed:', e);
      setSearchStatus('搜索失败: ' + (e instanceof Error ? e.message : '未知错误'));
    }
    setIsSearching(false);
  };

  const loadProducts = async (search?: string, page: number = 1) => {
    try {
      const params = new URLSearchParams({ page: String(page), page_size: String(MANAGE_PAGE_SIZE) });
      if (search) params.set('search', search);
      const res = await fetch(`${API}/api/products/list?${params}`);
      const d = await res.json();
      const items = (d.products || []).map((p: any) => ({
        id: p.id, image: `${API}/api/products/image/${p.id}`,
        images: p.image_urls || [],
        images: p.image_urls || [],
        date: p.inquiry_date || '', factory: p.manufacturer_name || '', model: p.manufacturer_code,
        address: p.address || '', link: p.manufacturer_link || '',
        cost: String(p.cost_price || ''), note: p.remarks || '',
        shipping: String(p.shipping_fee || ''), color: p.color, size: p.size,
      dist1_name: p.dist1_name || '', dist1_price: p.dist1_base_price || '', dist1_ship: p.dist1_shipping_fee || '', dist1_note: p.dist1_remarks || '',
      dist2_name: p.dist2_name || '', dist2_price: p.dist2_base_price || '', dist2_ship: p.dist2_shipping_fee || '', dist2_note: p.dist2_remarks || '',
      }));
      setProducts(items);
      setManageTotal(d.total || 0);
    } catch (e) {
      console.error('Load failed:', e);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('确定删除此商品？')) return;
    try {
      await fetch(`${API}/api/products/${id}`, { method: 'DELETE' });
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      console.error('Delete failed:', e);
    }
  };

  const [showDetail, setShowDetail] = useState(false);
  const [detailProduct, setDetailProduct] = useState<any>(null);
  const [detailEditing, setDetailEditing] = useState(false);
  const [detailForm, setDetailForm] = useState<any>({});
  const [priceAdjust, setPriceAdjust] = useState({ newPrice: '', date: '', note: '' });
  const [showPriceForm, setShowPriceForm] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [showPriceChanges, setShowPriceChanges] = useState(false);
  const [priceChanges, setPriceChanges] = useState<any[]>([]);
  const [loadingPriceChanges, setLoadingPriceChanges] = useState(false);
  const [priceChangesPage, setPriceChangesPage] = useState(1);
  const [priceChangesTotal, setPriceChangesTotal] = useState(0);
  const [priceChangesFilter, setPriceChangesFilter] = useState('');

  const loadPriceChanges = async (page: number = 1) => {
    setLoadingPriceChanges(true);
    try {
      const params = new URLSearchParams({ page: String(page), page_size: '50' });
      if (priceChangesFilter) params.set('field', priceChangesFilter);
      const res = await fetch(`${API}/api/products/price-changes?${params}`);
      const d = await res.json();
      setPriceChanges(d.items || []);
      setPriceChangesTotal(d.total || 0);
      setPriceChangesPage(page);
    } catch (e) {
      console.error('Load price changes failed:', e);
    }
    setLoadingPriceChanges(false);
  };

  const handleDetailEdit = () => {
    if (!detailProduct) return;
    setDetailForm({
      factory: detailProduct.factory || '',
      model: detailProduct.model || '',
      cost: detailProduct.cost || '',
      shipping: detailProduct.shipping || '',
      color: detailProduct.color || '',
      size: detailProduct.size || '',
      note: detailProduct.note || '',
      date: detailProduct.date || '',
      address: detailProduct.address || '',
      link: detailProduct.link || '',
      dist1_name: detailProduct.dist1_name || '', dist1_price: detailProduct.dist1_price || '',
      dist1_ship: detailProduct.dist1_ship || '',
      dist1_note: detailProduct.dist1_note || '',
      dist2_name: detailProduct.dist2_name || '', dist2_price: detailProduct.dist2_price || '',
      dist2_ship: detailProduct.dist2_ship || '',
      dist2_note: detailProduct.dist2_note || '',
    });
    setDetailEditing(true);
  };

  const handleDetailSave = async () => {
    if (!detailProduct) return;
    const oldCost = parseFloat(detailProduct.cost) || 0;
    const newCost = parseFloat(detailForm.cost) || 0;
    try {
      const body = {
        inquiry_date: detailForm.date,
        manufacturer_name: detailForm.factory,
        manufacturer_code: detailForm.model,
        address: detailForm.address,
        manufacturer_link: detailForm.link,
        cost_price: newCost,
        shipping_fee: parseFloat(detailForm.shipping) || 0,
        color: detailForm.color,
        size: detailForm.size,
        remarks: detailForm.note,
        dist1_name: detailForm.dist1_name, dist1_base_price: detailForm.dist1_price,
        dist1_shipping_fee: detailForm.dist1_ship,
        dist1_remarks: detailForm.dist1_note,
        dist2_name: detailForm.dist2_name, dist2_base_price: detailForm.dist2_price,
        dist2_shipping_fee: detailForm.dist2_ship,
        dist2_remarks: detailForm.dist2_note,
      };
      await fetch(`${API}/api/products/${detailProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      // 如果成本价变了，自动记录调价历史
      if (oldCost !== newCost && newCost > 0) {
        const today = new Date().toISOString().split('T')[0];
        await fetch(`${API}/api/products/${detailProduct.id}/price-history`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            new_price: newCost,
            effective_date: today,
            note: '编辑保存时自动更新',
          }),
        });
      }
      setDetailEditing(false);
      // 刷新详情以获取最新的 price_history
      const res = await fetch(`${API}/api/products/${detailProduct.id}`);
      const full = await res.json();
      setDetailProduct((prev: any) => ({
        ...prev, ...detailForm,
        price_history: full.price_history || [],
        cost: String(newCost),
      }));
      loadProducts(manageSearch, managePage);
    } catch (e) {
      console.error('Save failed:', e);
    }
  };

  const handleAddPriceHistory = async () => {
    if (!detailProduct || !priceAdjust.date || !priceAdjust.newPrice) return;
    try {
      const res = await fetch(`${API}/api/products/${detailProduct.id}/price-history`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          new_price: parseFloat(priceAdjust.newPrice),
          effective_date: priceAdjust.date,
          note: priceAdjust.note,
        }),
      });
      const d = await res.json();
      if (d.ok) {
        const res2 = await fetch(`${API}/api/products/${detailProduct.id}`);
        const full = await res2.json();
        setDetailProduct((prev: any) => ({
          ...prev,
          cost: String(full.cost_price),
          cost_price: full.cost_price,
          price_history: full.price_history || [],
        }));
        setPriceAdjust({ newPrice: '', date: '', note: '' });
        setShowPriceForm(false);
        loadProducts();
      }
    } catch (e) {
      console.error('Add price history failed:', e);
    }
  };

  const [managePage, setManagePage] = useState(1);
  const [manageTotal, setManageTotal] = useState(0);
  const MANAGE_PAGE_SIZE = 60;

  const handleShowDetail = async (p: any) => {
    setDetailEditing(false);
    setSelectedImageIdx(0);
    // Normalize field names
    const normalize = (obj: any) => ({
      ...obj,
      date: obj.date || obj.inquiry_date || '',
      factory: obj.factory || obj.manufacturer_name || '',
      cost: obj.cost !== undefined ? String(obj.cost) : (obj.cost_price !== undefined ? String(obj.cost_price) : ''),
      shipping: obj.shipping !== undefined ? String(obj.shipping) : (obj.shipping_fee !== undefined ? String(obj.shipping_fee) : ''),
      model: obj.model || obj.manufacturer_code || '',
      images: obj.images || obj.image_urls || [],
      note: obj.note || obj.remarks || '',
      dist1_name: obj.dist1_name || obj.dist1_name || '', dist1_price: obj.dist1_price || obj.dist1_base_price || '',
      dist1_ship: obj.dist1_ship || obj.dist1_shipping_fee || '',
      dist1_note: obj.dist1_note || obj.dist1_remarks || '',
      dist2_name: obj.dist2_name || obj.dist2_name || '', dist2_price: obj.dist2_price || obj.dist2_base_price || '',
      dist2_ship: obj.dist2_ship || obj.dist2_shipping_fee || '',
      dist2_note: obj.dist2_note || obj.dist2_remarks || '',
    });
    setDetailProduct(normalize(p));
    setShowDetail(true);
    try {
      const res = await fetch(`${API}/api/products/${p.id}`);
      const full = await res.json();
      setDetailProduct(normalize({ ...p, ...full, price_history: full.price_history || [] }));
    } catch (e) {
      console.error('Load detail failed:', e);
    }
  };

  const handleEditProduct = (p: Product) => {
    setEditingId(p.id);
    setEditForm({
      factory: p.factory || '',
      model: p.model || '',
      cost: p.cost || '',
      shipping: p.shipping || '',
      color: p.color || '',
      size: p.size || '',
      note: p.note || '',
      date: p.date || '',
      address: p.address || '',
      link: p.link || '',
    });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      const body = {
        inquiry_date: editForm.date,
        manufacturer_name: editForm.factory,
        manufacturer_code: editForm.model,
        address: editForm.address,
        manufacturer_link: editForm.link,
        cost_price: parseFloat(editForm.cost) || 0,
        shipping_fee: parseFloat(editForm.shipping) || 0,
        color: editForm.color,
        size: editForm.size,
        remarks: editForm.note,
      };
      await fetch(`${API}/api/products/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      setEditingId(null);
      loadProducts(manageSearch, managePage);
    } catch (e) {
      console.error('Save failed:', e);
    }
  };

  useEffect(() => { loadProducts('', 1); }, []);

  const handleInsertRemarkImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingRemarkImg(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch(`${API}/api/products/upload-remark-image`, { method: 'POST', body: form });
      const d = await res.json();
      if (d.ok) {
        const marker = `[图片: ${d.url}]`;
        setFormData(prev => ({ ...prev, note: prev.note + (prev.note ? '\n' : '') + marker }));
      }
    } catch (e) {
      console.error('Upload remark image failed:', e);
    }
    setUploadingRemarkImg(false);
    if (remarkImgInputRef.current) remarkImgInputRef.current.value = '';
  };

  const renderNote = (text: string): React.ReactNode => {
    if (!text) return '（无）';
    const parts = text.split(/(\[图片:\s*[^\]]+\])/g);
    return parts.map((part, i) => {
      const m = part.match(/\[图片:\s*([^\]]+)\]/);
      if (m) {
        return <img key={i} src={m[1]} alt="备注图片" style={{maxWidth:'100%',maxHeight:120,borderRadius:6,margin:'4px 0',display:'block'}} />;
      }
      return part ? <span key={i}>{part}</span> : null;
    });
  };

  const textColor = currentTheme === 'tech' ? 'text-cyan-100' : 'text-slate-800';
  const textSecondary = currentTheme === 'tech' ? 'text-cyan-300/70' : 'text-slate-500';
  const textMuted = currentTheme === 'tech' ? 'text-cyan-400/50' : 'text-slate-400';

  return (
    <>
    <div className={theme.bg}>
      <div className={`${theme.header}`} style={{ position: 'relative', zIndex: 100 }}>
        <motion.div className="flex items-center gap-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className={`p-2 rounded-xl ${currentTheme === 'tech' ? 'bg-cyan-500/20' : 'bg-white/20'}`}>
            <FolderOpen className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">商品图片同款搜索</h1>
        </motion.div>
        <div className="flex items-center gap-4">
          <motion.div className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full ${currentTheme === 'tech' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/10'}`}>
            <FolderOpen className="w-4 h-4" />
            <span>{manageTotal} 件商品</span>
          </motion.div>
          <div>
            <button ref={themeButtonRef} onClick={() => setShowThemeMenu(!showThemeMenu)} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${currentTheme === 'tech' ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400' : 'bg-white/10 hover:bg-white/20'}`}>
              <Palette className="w-4 h-4" />
              <span className="text-sm">{themes[currentTheme].name}</span>
            </button>
            <ThemeDropdown
              currentTheme={currentTheme}
              show={showThemeMenu}
              onClose={() => setShowThemeMenu(false)}
              onSelect={(t) => { setCurrentTheme(t); setShowThemeMenu(false); }}
              buttonRef={themeButtonRef}
            />
          </div>
        </div>
      </div>

      <div className="p-4 flex gap-4 max-w-6xl mx-auto">
        <div className={`${theme.card} relative`}>
          <div className={`flex items-center gap-2 mb-3 font-semibold ${textColor}`}>
            <div className={`p-1 rounded ${currentTheme === 'tech' ? 'bg-cyan-500/20' : 'bg-indigo-100'}`}>
              <Upload className={`w-3 h-3 ${currentTheme === 'tech' ? 'text-cyan-400' : 'text-indigo-600'}`} />
            </div>
            <span className="text-sm">录入商品</span>
          </div>

          <div className={theme.uploadZone} onClick={() => uploadInputRef.current?.click()}>
            {uploadImages.length > 0 ? (
              <div className="flex gap-1 flex-wrap items-center justify-center w-full h-full p-1">
                {uploadImages.map((img, i) => (
                  <img key={i} src={img} alt={`preview ${i}`} className="h-16 object-contain rounded border border-gray-200" />
                ))}
              </div>
            ) : (
              <>
                <div className={`p-2 rounded-lg mb-1 ${currentTheme === 'tech' ? 'bg-cyan-500/20' : 'bg-indigo-100/50'}`}>
                  <ImageIcon className={`w-5 h-5 ${currentTheme === 'tech' ? 'text-cyan-400' : 'text-indigo-400'}`} />
                </div>
                <span className={`text-xs font-medium ${textSecondary}`}>点击选择图片</span>
              </>
            )}
          </div>
          <input ref={uploadInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUploadImageSelect} />

          <div className="space-y-2 my-3">
            {[{ key: 'date', label: '咨询日期' }, { key: 'factory', label: '厂家名称' }, { key: 'model', label: '型号代码' }].map(({ key, label }) => (
              <div key={key} className="flex items-center gap-2">
                <span className={`text-xs w-14 font-medium ${textSecondary}`}>{label}</span>
                <input type="text" value={formData[key as keyof typeof formData]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} className={theme.input} />
              </div>
            ))}
            <div style={{marginTop:4}}>
              <div className="flex items-center gap-2" style={{marginBottom:4}}>
                <span className={`text-xs w-14 font-medium ${textSecondary}`}>备注</span>
                <button
                  onClick={() => remarkImgInputRef.current?.click()}
                  disabled={uploadingRemarkImg}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                    currentTheme === 'tech' ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30' :
                    'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Plus className="w-3 h-3" />{uploadingRemarkImg ? '上传中...' : '插入图片'}
                </button>
              </div>
              <input ref={remarkImgInputRef} type="file" accept="image/*" className="hidden" onChange={handleInsertRemarkImage} />
              <textarea
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className={theme.input}
                style={{minHeight:60,resize:'vertical',width:'100%'}}
                placeholder="输入备注文字，或点击「插入图片」添加图片"
              />
            </div>
          </div>

          <button
            onClick={() => setShowMoreFields(!showMoreFields)}
            className={`w-full flex items-center justify-center gap-1 py-1.5 text-xs font-medium rounded transition-colors ${
              currentTheme === 'tech' ? 'text-cyan-400 hover:bg-cyan-500/10' :
              'text-slate-500 hover:bg-slate-100'
            }`}
          >
            {showMoreFields ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {showMoreFields ? '收起更多' : '展开更多'}
          </button>

          <div className={`text-xs mb-2 font-medium ${textSecondary}`}>数据库共 {manageTotal} 件商品</div>

          <button onClick={handleAddProduct} disabled={!uploadImages.length} className={`${theme.btnGreen} mb-2 disabled:opacity-50`}>添加到数据库</button>
          <button onClick={() => setShowManageDb(true)} className={`${theme.btnPurple} flex items-center justify-center gap-1 text-xs mb-2`}><Settings className="w-3 h-3" />管理数据库</button>
          <button onClick={() => { setShowPriceChanges(true); loadPriceChanges(1); }} className={`${theme.btnPurple} flex items-center justify-center gap-1 text-xs`}><Settings className="w-3 h-3" />调价记录</button>

          {showMoreFields && (
            <div className="absolute left-full top-0 h-full z-50 ml-4" style={{width:550}}>
              <div className={`w-full h-full flex flex-col ${theme.card}`}>
                <div className={`flex items-center gap-2 mb-3 font-semibold ${textColor}`}>
                  <span className="text-sm">更多字段</span>
                </div>
                <div className="space-y-1 overflow-y-auto">
                  {[{ key: 'address', label: '地址' }, { key: 'link', label: '厂家链接' }, { key: 'cost', label: '成本' }, { key: 'shipping', label: '运费' }, { key: 'color', label: '颜色' }, { key: 'size', label: '尺码' }].map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-2">
                      <span className={`text-xs w-14 font-medium ${textSecondary}`}>{label}</span>
                      <input type="text" value={formData[key as keyof typeof formData]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} className={theme.input} />
                    </div>
                  ))}
                </div>
                <div className={`pt-2 mt-1 ${currentTheme === 'tech' ? 'border-t border-cyan-500/20' : 'border-t border-slate-200'}`}>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
{formData.distributors.map((d: any, i: number) => (
                      <div key={i} style={{marginBottom:8}}>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:4}}>
                          <span className={`text-xs font-semibold ${textColor}`}>分销商 {i+1}</span>
                          {formData.distributors.length > 1 && <button onClick={() => {
                            const arr = [...formData.distributors]; arr.splice(i,1);
                            setFormData({...formData, distributors: arr});
                          }} style={{padding:'2px 6px',fontSize:10,border:'none',background:'#fee2e2',color:'#ef4444',borderRadius:4,cursor:'pointer'}}>删除</button>}
                        </div>
                        {[{ key: 'name', label: '名称' }, { key: 'price', label: '价格' }, { key: 'ship', label: '运费' }, { key: 'note', label: '备注' }].map(({ key, label }) => (
                          <div key={key} className="flex items-center gap-2 mb-0.5">
                            <span className={`text-xs w-10 font-medium shrink-0 ${textSecondary}`}>{label}</span>
                            <input type="text" value={(d as any)[key] || ''} onChange={(e) => {
                              const arr = [...formData.distributors];
                              arr[i] = {...arr[i], [key]: e.target.value};
                              setFormData({...formData, distributors: arr});
                            }} className={theme.input} />
                          </div>
                        ))}
                      </div>
                    ))}
                    <button onClick={() => {
                      setFormData({...formData, distributors: [...formData.distributors, { name: '', price: '', ship: '', note: '' }]});
                    }} style={{padding:'4px 10px',fontSize:11,border:'1px dashed #3b82f6',background:'#eff6ff',color:'#3b82f6',borderRadius:6,cursor:'pointer',width:'100%'}}>+ 添加分销商</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={`${theme.cardRight}`}>
          <div className={`flex items-center gap-2 mb-3 font-semibold ${textColor}`}>
            <div className={`p-1 rounded ${currentTheme === 'tech' ? 'bg-fuchsia-500/20' : 'bg-orange-100'}`}>
              <Search className={`w-3 h-3 ${currentTheme === 'tech' ? 'text-fuchsia-400' : 'text-orange-600'}`} />
            </div>
            <span className="text-sm">搜索同款</span>
          </div>

          <div className="flex gap-4">
            <div className={`w-40 ${theme.uploadZone}`} onClick={() => searchInputRef.current?.click()}>
              {searchImage ? (
                <img src={searchImage} alt="search" className="w-full h-full object-contain rounded p-1" />
              ) : (
                <>
                  <div className={`p-2 rounded-lg mb-1 ${currentTheme === 'tech' ? 'bg-fuchsia-500/20' : 'bg-orange-100/50'}`}>
                    <ImageIcon className={`w-5 h-5 ${currentTheme === 'tech' ? 'text-fuchsia-400' : 'text-orange-400'}`} />
                  </div>
                  <span className={`text-xs font-medium ${textSecondary}`}>点击选择</span>
                  <span className={`text-xs ${textMuted}`}>搜索图片</span>
                </>
              )}
            </div>
            <input ref={searchInputRef} type="file" accept="image/*" className="hidden" onChange={handleSearchImageSelect} />

            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <label className={`flex items-center gap-1 text-xs cursor-pointer ${textSecondary}`}>
                  <input type="checkbox" checked={rerank} onChange={(e) => setRerank(e.target.checked)} className="w-3 h-3 rounded" />
                  <span className="font-medium">精排(Rerank)</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium ${textSecondary}`}>返回:</span>
                  <input type="number" value={returnCount} onChange={(e) => setReturnCount(Number(e.target.value))} className={`w-16 px-2 py-1 text-xs rounded ${theme.input}`} />
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => searchInputRef.current?.click()} className={`${theme.btnBlue} flex items-center justify-center gap-1 text-xs`}><Upload className="w-3 h-3" />选择图片</button>
                <button onClick={handleSearch} disabled={!searchImage || isSearching} className={`${theme.btnOrange} flex items-center justify-center gap-1 text-xs disabled:opacity-50`}><Search className="w-3 h-3" />{isSearching ? '搜索中...' : '开始搜索'}</button>
              </div>
            </div>
          </div>

          {searchStatus && (
            <div style={{fontSize:12,marginTop:8,marginBottom:4,color: searchStatus.includes('失败') ? '#ef4444' : searchStatus.includes('搜索中') ? '#f59e0b' : '#22c55e'}}>
              {searchStatus}
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="mt-4">
              <h3 className={`text-sm font-semibold mb-2 ${textColor}`}>搜索结果</h3>
              <div className="grid grid-cols-5 gap-2">
                {searchResults.map((product, idx) => (
                  <motion.div key={product.id} className={`border rounded-lg p-2 cursor-pointer transition-all ${currentTheme === 'tech' ? 'border-cyan-500/30 bg-slate-800/50 hover:border-cyan-400' : 'border-slate-200/70 hover:shadow-md'}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }} whileHover={{ scale: 1.02 }}>
                    <img src={product.image} alt="result" className={`w-full h-16 object-contain mb-1 rounded ${currentTheme === 'tech' ? 'bg-slate-800' : 'bg-slate-50'}`} />
                    <div className={`text-xs truncate font-medium ${textColor}`}>{product.factory}</div>
                    <div className={`text-xs ${textSecondary}`}>{product.cost}</div>
                    {product.score && <div className={`text-xs text-green-500`}>{(product.score*100).toFixed(0)}%</div>}
                    <button onClick={() => handleShowDetail(product)} className={`w-full mt-1 py-1 text-xs rounded ${currentTheme === 'tech' ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>详情</button>
                  </motion.div>
                ))}

            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  {showManageDb && (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,zIndex:9999,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
      <div style={{position:'relative',width:'85%',height:'85vh',background:'#fff',borderRadius:12,display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 20px',borderBottom:'1px solid #e5e7eb'}}>
          <div style={{display:'flex',alignItems:'center',gap:12,flex:1}}>
            <h2 style={{margin:0,fontSize:16,fontWeight:600,color:'#1a1a1a',whiteSpace:'nowrap'}}>管理数据库</h2>
            <input type="text" value={manageSearch} onChange={e => { setManageSearch(e.target.value); setManagePage(1); loadProducts(e.target.value, 1); }} placeholder="搜索厂家名称、型号代码、分销商名称..." style={{flex:1,maxWidth:400,padding:'6px 12px',fontSize:13,border:'1px solid #d1d5db',borderRadius:6,outline:'none'}} />
            {manageSearch && <button onClick={() => { setManageSearch(''); setManagePage(1); loadProducts('', 1); }} style={{padding:'4px 8px',fontSize:11,border:'1px solid #d1d5db',background:'#fff',color:'#6b7280',borderRadius:4,cursor:'pointer'}}>清除</button>}
          </div>
          <button onClick={() => { setShowManageDb(false); setManageSearch(""); }} style={{background:'none',border:'none',cursor:'pointer',padding:4}}><X className="w-5 h-5" style={{color:'#6b7280'}} /></button>
        </div>
        <div style={{flex:1,overflow:'auto',scrollbarWidth:'none',padding:16}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:12}}>
            {products.map((p) => (
              <div key={p.id} style={{border:'1px solid #e5e7eb',borderRadius:8,padding:10,background:'#fafafa'}}>
                <div style={{position:'relative',width:'100%',height:80,background:'#f3f4f6',borderRadius:4,marginBottom:8,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
                <img src={p.image} alt="" style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain'}} />
                {p.images && p.images.length > 1 && <span style={{position:'absolute',bottom:4,right:4,background:'rgba(0,0,0,0.6)',color:'#fff',fontSize:10,padding:'1px 6px',borderRadius:8}}>+{p.images.length - 1}</span>}
              </div>
                <div style={{fontSize:12,fontWeight:500,color:'#1a1a1a',marginBottom:4}}>{p.factory || '(无厂家)'}</div>
                <div style={{fontSize:11,color:'#6b7280',marginBottom:4}}>{p.model || ''}</div>
                <div style={{fontSize:11,color:'#6b7280',marginBottom:4}}>成本: {p.cost || '-'}</div>
                <div style={{display:'flex',gap:6}}>
                  <button onClick={() => handleShowDetail(p)} style={{flex:1,padding:'4px 0',fontSize:11,border:'1px solid #10b981',background:'#ecfdf5',color:'#10b981',borderRadius:4,cursor:'pointer'}}><Search className="w-3 h-3" style={{display:'inline',marginRight:2}} />详情</button>
                  <button onClick={() => handleDeleteProduct(p.id)} style={{flex:1,padding:'4px 0',fontSize:11,border:'1px solid #ef4444',background:'#fef2f2',color:'#ef4444',borderRadius:4,cursor:'pointer'}}><Trash2 className="w-3 h-3" style={{display:'inline',marginRight:2}} />删除</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )}

  {showPriceChanges && (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,zIndex:9999,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center'}} onClick={() => setShowPriceChanges(false)}>
      <div style={{position:'relative',width:'85%',maxHeight:'90vh',background:'#fff',borderRadius:12,overflow:'hidden',display:'flex',flexDirection:'column'}} onClick={e => e.stopPropagation()}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 20px',borderBottom:'1px solid #e5e7eb',background:'#f8f9fa'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <h2 style={{margin:0,fontSize:16,fontWeight:600,color:'#1a1a1a'}}>📈 调价记录</h2>
            <span style={{fontSize:12,color:'#999'}}>共 {priceChangesTotal} 条记录</span>
          </div>
          <button onClick={() => setShowPriceChanges(false)} style={{background:'none',border:'none',cursor:'pointer',fontSize:22,color:'#999',padding:'0 8px',lineHeight:1}}>×</button>
        </div>
        <div style={{padding:'12px 20px',borderBottom:'1px solid #e5e7eb',display:'flex',gap:8,alignItems:'center',background:'#fff'}}>
          <span style={{fontSize:12,color:'#666'}}>筛选:</span>
          <select value={priceChangesFilter} onChange={e => { setPriceChangesFilter(e.target.value); setTimeout(() => loadPriceChanges(1), 0); }} style={{padding:'4px 8px',fontSize:12,border:'1px solid #d1d5db',borderRadius:6,outline:'none'}}>
            <option value="">全部字段</option>
            <option value="cost_price">成本价</option>
            <option value="shipping_fee">运费</option>
            <option value="dist1_base_price">分销商1价格</option>
            <option value="dist1_shipping_fee">分销商1运费</option>
            <option value="dist2_base_price">分销商2价格</option>
            <option value="dist2_shipping_fee">分销商2运费</option>
          </select>
          {priceChangesPage > 1 && <button onClick={() => loadPriceChanges(priceChangesPage - 1)} style={{padding:'4px 12px',fontSize:11,border:'1px solid #d1d5db',background:'#fff',color:'#6b7280',borderRadius:4,cursor:'pointer'}}>上一页</button>}
          {priceChangesPage * 50 < priceChangesTotal && <button onClick={() => loadPriceChanges(priceChangesPage + 1)} style={{padding:'4px 12px',fontSize:11,border:'1px solid #d1d5db',background:'#fff',color:'#6b7280',borderRadius:4,cursor:'pointer'}}>下一页</button>}
          <span style={{fontSize:11,color:'#999'}}>第 {priceChangesPage} / {Math.max(1, Math.ceil(priceChangesTotal / 50))} 页</span>
        </div>
        <div style={{flex:1,overflow:'auto',scrollbarWidth:'none',padding:0}}>
          {loadingPriceChanges ? (
            <div style={{textAlign:'center',padding:40,fontSize:13,color:'#999'}}>加载中...</div>
          ) : priceChanges.length === 0 ? (
            <div style={{textAlign:'center',padding:40,fontSize:13,color:'#999'}}>暂无调价记录</div>
          ) : (
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
              <thead>
                <tr style={{background:'#f8f9fa',borderBottom:'2px solid #e5e7eb'}}>
                  <th style={{padding:'8px 12px',textAlign:'left',color:'#666',fontWeight:500}}>时间</th>
                  <th style={{padding:'8px 12px',textAlign:'left',color:'#666',fontWeight:500}}>商品</th>
                  <th style={{padding:'8px 12px',textAlign:'left',color:'#666',fontWeight:500}}>字段</th>
                  <th style={{padding:'8px 12px',textAlign:'left',color:'#666',fontWeight:500}}>旧值</th>
                  <th style={{padding:'8px 12px',textAlign:'left',color:'#666',fontWeight:500}}>新值</th>
                  <th style={{padding:'8px 12px',textAlign:'left',color:'#666',fontWeight:500}}>生效日期</th>
                  <th style={{padding:'8px 12px',textAlign:'left',color:'#666',fontWeight:500}}>备注</th>
                </tr>
              </thead>
              <tbody>
                {priceChanges.map((log: any, i: number) => (
                  <tr key={log.id || i} style={{borderBottom:'1px solid #f3f4f6'}}>
                    <td style={{padding:'6px 12px',color:'#999',whiteSpace:'nowrap'}}>{(log.created_at || '').slice(0, 10)}</td>
                    <td style={{padding:'6px 12px',color:'#1a1a1a',maxWidth:120,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{log.product_name}</td>
                    <td style={{padding:'6px 12px',color:'#555'}}>{log.field_label}</td>
                    <td style={{padding:'6px 12px',color:'#999',textDecoration:'line-through'}}>¥{log.old_value}</td>
                    <td style={{padding:'6px 12px',color:'#ea580c',fontWeight:500}}>¥{log.new_value}</td>
                    <td style={{padding:'6px 12px',color:'#999',whiteSpace:'nowrap'}}>{log.effective_date}</td>
                    <td style={{padding:'6px 12px',color:'#999'}}>{log.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )}
  {showDetail && detailProduct && (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,zIndex:9999,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center'}} onClick={() => { if(!detailEditing) setShowDetail(false); }}>
      <div style={{position:'relative',width:'680px',maxHeight:'90vh',background:'#fff',borderRadius:12,overflow:'hidden',display:'flex',flexDirection:'column'}} onClick={e => e.stopPropagation()}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 20px',borderBottom:'1px solid #e5e7eb',background:'#f8f9fa'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <h2 style={{margin:0,fontSize:16,fontWeight:600,color:'#1a1a1a'}}>商品详情</h2>
            {!detailEditing ? (
              <button onClick={handleDetailEdit} style={{padding:'4px 12px',fontSize:12,border:'1px solid #3b82f6',background:'#eff6ff',color:'#3b82f6',borderRadius:6,cursor:'pointer'}}><Pencil className="w-3 h-3" style={{display:'inline',marginRight:4}} />编辑</button>
            ) : (
              <span style={{fontSize:12,color:'#f59e0b',background:'#fffbeb',padding:'2px 10px',borderRadius:4}}>编辑模式</span>
            )}
          </div>
          <button onClick={() => { setShowDetail(false); setDetailEditing(false); setShowPriceForm(false); setPriceAdjust({newPrice:'',date:'',note:''}); }} style={{background:'none',border:'none',cursor:'pointer',fontSize:22,color:'#999',padding:'0 8px',lineHeight:1}}>×</button>
        </div>
        <div style={{flex:1,overflow:'auto',scrollbarWidth:'none',padding:20}}>
          <div style={{display:'flex',gap:20,marginBottom:16}}>
            <div style={{flexShrink:0}}>
              <img src={detailProduct.images && detailProduct.images.length > 0 ? detailProduct.images[selectedImageIdx] || detailProduct.image : detailProduct.image} alt="" style={{width:200,height:200,objectFit:'contain',background:'#f3f4f6',borderRadius:8}} />
              {detailProduct.images && detailProduct.images.length > 1 && (
                <div style={{display:'flex',gap:4,marginTop:4,flexWrap:'wrap',maxWidth:200}}>
                  {detailProduct.images.map((img: string, i: number) => (
                    <img key={i} src={img} alt="" style={{width:selectedImageIdx === i ? 36 : 30,height:selectedImageIdx === i ? 36 : 30,objectFit:'cover',borderRadius:4,border:selectedImageIdx === i ? '2px solid #3b82f6' : '1px solid #e5e7eb',cursor:'pointer',transition:'all 0.15s'}} onClick={() => setSelectedImageIdx(i)} />
                  ))}
                </div>
              )}
            </div>
            <div style={{flex:1,display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px 20px',alignContent:'start'}}>
              <div><div style={{fontSize:11,color:'#999',marginBottom:1,textTransform:'uppercase',letterSpacing:0.5}}>咨询日期</div>
                {detailEditing ? <input type="text" value={detailForm.date} onChange={e => setDetailForm({...detailForm, date: e.target.value})} style={{width:'100%',padding:'4px 8px',fontSize:13,border:'1px solid #d1d5db',borderRadius:6,outline:'none'}} /> : <div style={{fontSize:14,fontWeight:500,color:'#1a1a1a'}}>{detailProduct.date || '-'}</div>}
              </div>
              <div><div style={{fontSize:11,color:'#999',marginBottom:1,textTransform:'uppercase',letterSpacing:0.5}}>厂家名称</div>
                {detailEditing ? <input type="text" value={detailForm.factory} onChange={e => setDetailForm({...detailForm, factory: e.target.value})} style={{width:'100%',padding:'4px 8px',fontSize:13,border:'1px solid #d1d5db',borderRadius:6,outline:'none'}} /> : <div style={{fontSize:14,fontWeight:600,color:'#1a1a1a'}}>{detailProduct.factory || '-'}</div>}
              </div>
              <div><div style={{fontSize:11,color:'#999',marginBottom:1,textTransform:'uppercase',letterSpacing:0.5}}>型号代码</div>
                {detailEditing ? <input type="text" value={detailForm.model} onChange={e => setDetailForm({...detailForm, model: e.target.value})} style={{width:'100%',padding:'4px 8px',fontSize:13,border:'1px solid #d1d5db',borderRadius:6,outline:'none'}} /> : <div style={{fontSize:14,color:'#1a1a1a'}}>{detailProduct.model || '-'}</div>}
              </div>
              <div><div style={{fontSize:11,color:'#999',marginBottom:1,textTransform:'uppercase',letterSpacing:0.5}}>成本 / 运费</div>
                {detailEditing ? (
                  <div style={{display:'flex',gap:6}}>
                    <input type="text" value={detailForm.cost} onChange={e => setDetailForm({...detailForm, cost: e.target.value})} placeholder="成本" style={{flex:1,padding:'4px 8px',fontSize:13,border:'1px solid #d1d5db',borderRadius:6,outline:'none'}} />
                    <input type="text" value={detailForm.shipping} onChange={e => setDetailForm({...detailForm, shipping: e.target.value})} placeholder="运费" style={{flex:1,padding:'4px 8px',fontSize:13,border:'1px solid #d1d5db',borderRadius:6,outline:'none'}} />
                  </div>
                ) : <div style={{fontSize:14,color:'#1a1a1a'}}>¥{detailProduct.cost || '0'} / 运费 ¥{detailProduct.shipping || '0'}</div>}
              </div>
              <div><div style={{fontSize:11,color:'#999',marginBottom:1,textTransform:'uppercase',letterSpacing:0.5}}>颜色</div>
                {detailEditing ? <input type="text" value={detailForm.color} onChange={e => setDetailForm({...detailForm, color: e.target.value})} style={{width:'100%',padding:'4px 8px',fontSize:13,border:'1px solid #d1d5db',borderRadius:6,outline:'none'}} /> : <div style={{fontSize:14,color:'#1a1a1a'}}>{detailProduct.color || '-'}</div>}
              </div>
              <div><div style={{fontSize:11,color:'#999',marginBottom:1,textTransform:'uppercase',letterSpacing:0.5}}>尺码</div>
                {detailEditing ? <input type="text" value={detailForm.size} onChange={e => setDetailForm({...detailForm, size: e.target.value})} style={{width:'100%',padding:'4px 8px',fontSize:13,border:'1px solid #d1d5db',borderRadius:6,outline:'none'}} /> : <div style={{fontSize:14,color:'#1a1a1a'}}>{detailProduct.size || '-'}</div>}
              </div>
            </div>
          </div>
          <div style={{background:'#f8f9fa',borderRadius:8,padding:'12px 16px',marginBottom:12,display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <div><div style={{fontSize:11,color:'#999',marginBottom:1}}>地址</div>
              {detailEditing ? <input type="text" value={detailForm.address} onChange={e => setDetailForm({...detailForm, address: e.target.value})} style={{width:'100%',padding:'4px 8px',fontSize:13,border:'1px solid #d1d5db',borderRadius:6,outline:'none'}} /> : <div style={{fontSize:13,color:'#1a1a1a'}}>{detailProduct.address || '-'}</div>}
            </div>
            <div><div style={{fontSize:11,color:'#999',marginBottom:1}}>厂家链接</div>
              {detailEditing ? <input type="text" value={detailForm.link} onChange={e => setDetailForm({...detailForm, link: e.target.value})} style={{width:'100%',padding:'4px 8px',fontSize:13,border:'1px solid #d1d5db',borderRadius:6,outline:'none'}} /> : <div style={{fontSize:13,color:'#2563eb',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{detailProduct.link || '-'}</div>}
            </div>
          </div>
          <div style={{background:'#f0fdf4',borderRadius:8,border:'1px solid #dcfce7',padding:'12px 16px',marginBottom:12}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
              <div style={{fontSize:12,fontWeight:600,color:'#16a34a'}}>📊 分销商报价</div>
              {detailEditing && <button onClick={() => { setDetailForm({...detailForm, distributors: [...detailForm.distributors, {name:'',price:'',ship:'',note:''}]}) }} style={{padding:'2px 10px',fontSize:11,border:'1px dashed #16a34a',background:'#f0fdf4',color:'#16a34a',borderRadius:4,cursor:'pointer'}}>+ 添加</button>}
            </div>
            {(detailEditing ? detailForm.distributors : (detailProduct.distributor_prices || [])).map((d: any, i: number) => (
              <div key={i} style={{background:'#fff',borderRadius:6,padding:'8px 10px',marginBottom:6}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:4}}>
                  <span style={{fontSize:11,fontWeight:600,color:'#555'}}>分销商 {i+1}</span>
                  {detailEditing && detailForm.distributors.length > 1 && <button onClick={() => { const arr = [...detailForm.distributors]; arr.splice(i,1); setDetailForm({...detailForm, distributors: arr}) }} style={{padding:'1px 6px',fontSize:10,border:'none',background:'#fee2e2',color:'#ef4444',borderRadius:3,cursor:'pointer'}}>删除</button>}
                </div>
                {detailEditing ? (
                  <>{['name','price','ship','note'].map(fld => (
                    <div key={fld} style={{display:'flex',gap:4,marginBottom:3}}>
                      <span style={{fontSize:11,color:'#999',width:36}}>{fld === 'name' ? '名称' : fld === 'price' ? '价格' : fld === 'ship' ? '运费' : '备注'}</span>
                      <input type="text" value={d[fld] || ''} onChange={e => { const arr = [...detailForm.distributors]; arr[i] = {...arr[i], [fld]: e.target.value}; setDetailForm({...detailForm, distributors: arr}) }} style={{flex:1,padding:'3px 6px',fontSize:12,border:'1px solid #d1d5db',borderRadius:4,outline:'none'}} />
                    </div>
                  ))}</>
                ) : (
                  <div style={{fontSize:13,color:'#1a1a1a'}}>
                    {d.distributor_name || '-'} | 价格 ¥{(d.base_price || 0).toFixed(2)} / 运费 ¥{(d.shipping_fee || 0).toFixed(2)}
                    {d.remarks && <div style={{fontSize:11,color:'#666',marginTop:2}}>备注: {d.remarks}</div>}
                  </div>
                )}
              </div>
            ))}
            {(!detailEditing && (!detailProduct.distributor_prices || detailProduct.distributor_prices.length === 0)) && <div style={{fontSize:12,color:'#999'}}>暂无分销商</div>}
          </div>
          {/* 调价历史 */}          {/* 调价历史 */}
          <div style={{background:'#fff7ed',borderRadius:8,border:'1px solid #fed7aa',padding:'12px 16px',marginBottom:12}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
              <div style={{fontSize:12,fontWeight:600,color:'#ea580c'}}>📈 调价历史</div>
              <div style={{fontSize:12,color:'#666'}}>当前成本: <strong>¥{detailProduct.cost || '0'}</strong></div>
            </div>
            {!showPriceForm ? (
              <button onClick={() => setShowPriceForm(true)} style={{padding:'4px 12px',fontSize:11,border:'1px solid #ea580c',background:'#fff',color:'#ea580c',borderRadius:6,cursor:'pointer',marginBottom:8}}>+ 新增调价</button>
            ) : (
              <div style={{background:'#fff',borderRadius:6,padding:10,marginBottom:8}}>
                <div style={{display:'flex',gap:6,marginBottom:6,alignItems:'center'}}>
                  <span style={{fontSize:11,color:'#666',width:42}}>新价格</span>
                  <input type="number" value={priceAdjust.newPrice} onChange={e => setPriceAdjust({...priceAdjust, newPrice: e.target.value})} placeholder="0.00" style={{flex:1,padding:'3px 6px',fontSize:12,border:'1px solid #d1d5db',borderRadius:4,outline:'none'}} />
                  <span style={{fontSize:11,color:'#666',width:36}}>生效日</span>
                  <input type="date" value={priceAdjust.date} onChange={e => setPriceAdjust({...priceAdjust, date: e.target.value})} style={{flex:1,padding:'3px 6px',fontSize:12,border:'1px solid #d1d5db',borderRadius:4,outline:'none'}} />
                </div>
                <div style={{display:'flex',gap:6,marginBottom:6}}>
                  <span style={{fontSize:11,color:'#666',width:42}}>备注</span>
                  <input type="text" value={priceAdjust.note} onChange={e => setPriceAdjust({...priceAdjust, note: e.target.value})} placeholder="调价原因（可选）" style={{flex:1,padding:'3px 6px',fontSize:12,border:'1px solid #d1d5db',borderRadius:4,outline:'none'}} />
                </div>
                <div style={{display:'flex',gap:6}}>
                  <button onClick={handleAddPriceHistory} style={{padding:'4px 16px',fontSize:11,border:'none',background:'#ea580c',color:'#fff',borderRadius:6,cursor:'pointer'}}>保存调价</button>
                  <button onClick={() => { setShowPriceForm(false); setPriceAdjust({newPrice:'',date:'',note:''}); }} style={{padding:'4px 12px',fontSize:11,border:'1px solid #d1d5db',background:'#fff',color:'#6b7280',borderRadius:6,cursor:'pointer'}}>取消</button>
                </div>
              </div>
            )}
            {(!detailProduct.price_history || detailProduct.price_history.length === 0) ? (
              <div style={{fontSize:11,color:'#999'}}>暂无调价记录</div>
            ) : (
              <div style={{maxHeight:160,overflow:'auto'}}>
                {detailProduct.price_history.map((h: any, i: number) => (
                  <div key={h.id || i} style={{display:'flex',alignItems:'center',gap:8,padding:'4px 0',borderBottom:'1px solid #f5f5f5',fontSize:11}}>
                    <span style={{color:'#999',whiteSpace:'nowrap'}}>{h.effective_date}</span>
                    <span style={{color:'#666',textDecoration:'line-through',marginRight:2}}>¥{h.old_price}</span>
                    <span style={{color:'#ea580c',fontWeight:600}}>→ ¥{h.new_price}</span>
                    {h.note && <span style={{color:'#999',marginLeft:4}}>({h.note})</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{background:'#f8f9fa',borderRadius:8,padding:'12px 16px',marginBottom:12}}>
            <div style={{fontSize:12,fontWeight:600,color:'#555',marginBottom:6}}>📝 备注</div>
            {detailEditing ? (
              <textarea value={detailForm.note} onChange={e => setDetailForm({...detailForm, note: e.target.value})} style={{width:'100%',padding:'8px',fontSize:13,border:'1px solid #d1d5db',borderRadius:6,outline:'none',resize:'vertical',minHeight:60}} />
            ) : (
              <div style={{fontSize:13,color:'#1a1a1a',whiteSpace:'pre-wrap',lineHeight:1.6}}>{renderNote(detailProduct.note || '')}</div>
            )}
          </div>
        </div>
        <div style={{display:'flex',justifyContent:'flex-end',gap:8,padding:'12px 20px',borderTop:'1px solid #e5e7eb',background:'#f8f9fa'}}>
          <button onClick={() => { setShowDetail(false); setDetailEditing(false); setShowPriceForm(false); setPriceAdjust({newPrice:'',date:'',note:''}); }} style={{padding:'6px 16px',fontSize:13,border:'1px solid #d1d5db',background:'#fff',color:'#6b7280',borderRadius:6,cursor:'pointer'}}>关闭</button>
          {detailEditing ? (
            <><button onClick={handleDetailSave} style={{padding:'6px 16px',fontSize:13,border:'none',background:'#22c55e',color:'#fff',borderRadius:6,cursor:'pointer'}}>💾 保存修改</button>
            <button onClick={() => setDetailEditing(false)} style={{padding:'6px 16px',fontSize:13,border:'1px solid #d1d5db',background:'#fff',color:'#6b7280',borderRadius:6,cursor:'pointer'}}>取消</button></>
          ) : (
            <button onClick={async () => { if (window.confirm('确定删除此商品？')) { await fetch(`${API}/api/products/${detailProduct.id}`, {method:'DELETE'}); setShowDetail(false); loadProducts(manageSearch, managePage); }}} style={{padding:'6px 16px',fontSize:13,border:'none',background:'#ef4444',color:'#fff',borderRadius:6,cursor:'pointer'}}>🗑️ 删除</button>
          )}
        </div>
      </div>
    </div>
  )}
  </>
  );
}

export default App;