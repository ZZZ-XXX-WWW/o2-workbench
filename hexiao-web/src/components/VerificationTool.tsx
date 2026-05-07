import React, { useState, useEffect, useRef } from 'react';
import { FileText, Play, Settings, Edit3, Sun, Moon, Leaf, Coffee, Upload, FolderOpen, Check, X } from 'lucide-react';
import { useVerification } from '../hooks/useVerification';
import PriceEditor from './PriceEditor';

type Theme = 'light' | 'dark' | 'fresh' | 'warm' | 'purple' | 'blue';

const themes: { key: Theme; label: string; icon: React.ElementType; gradient: string }[] = [
  { key: 'light', label: '浅色', icon: Sun, gradient: 'from-amber-400 to-orange-500' },
  { key: 'dark', label: '深色', icon: Moon, gradient: 'from-slate-600 to-slate-800' },
  { key: 'fresh', label: '清新', icon: Leaf, gradient: 'from-emerald-400 to-teal-500' },
  { key: 'warm', label: '暖色', icon: Coffee, gradient: 'from-orange-400 to-red-500' },
  { key: 'purple', label: '紫韵', icon: Moon, gradient: 'from-violet-400 to-purple-600' },
  { key: 'blue', label: '海洋', icon: Sun, gradient: 'from-cyan-400 to-blue-600' },
];

const themeStyles: Record<Theme, { bg: string; card: string; border: string; primary: string; primaryLight: string; text: string; sub: string; accent: string }> = {
  light: { bg: 'bg-slate-50', card: 'bg-white', border: 'border-slate-200', primary: 'bg-blue-500', primaryLight: 'bg-blue-50', text: 'text-slate-800', sub: 'text-slate-500', accent: 'text-blue-500' },
  dark: { bg: 'bg-gradient-to-br from-slate-900 to-slate-800', card: 'bg-slate-800/90', border: 'border-slate-700', primary: 'bg-gradient-to-r from-slate-500 to-slate-600', primaryLight: 'bg-slate-700', text: 'text-slate-100', sub: 'text-slate-400', accent: 'text-slate-400' },
  fresh: { bg: 'bg-gradient-to-br from-emerald-50 to-teal-50', card: 'bg-white/90', border: 'border-emerald-200', primary: 'bg-gradient-to-r from-emerald-500 to-teal-500', primaryLight: 'bg-emerald-100', text: 'text-emerald-900', sub: 'text-emerald-600', accent: 'text-emerald-500' },
  warm: { bg: 'bg-gradient-to-br from-orange-50 to-red-50', card: 'bg-white/90', border: 'border-orange-200', primary: 'bg-gradient-to-r from-orange-500 to-red-500', primaryLight: 'bg-orange-100', text: 'text-orange-900', sub: 'text-orange-600', accent: 'text-orange-500' },
  purple: { bg: 'bg-gradient-to-br from-violet-50 to-purple-50', card: 'bg-white/90', border: 'border-violet-200', primary: 'bg-gradient-to-r from-violet-500 to-purple-600', primaryLight: 'bg-violet-100', text: 'text-violet-900', sub: 'text-violet-600', accent: 'text-violet-500' },
  blue: { bg: 'bg-gradient-to-br from-cyan-50 to-blue-50', card: 'bg-white/90', border: 'border-cyan-200', primary: 'bg-gradient-to-r from-cyan-500 to-blue-600', primaryLight: 'bg-cyan-100', text: 'text-cyan-900', sub: 'text-cyan-600', accent: 'text-cyan-500' },
};

export default function VerificationTool() {
  const [theme, setTheme] = useState<Theme>('light');
  const [showPriceEditor, setShowPriceEditor] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [outputPath, setOutputPath] = useState('');
  const dirInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    prices, shipping, loaded, inputFile, logs, isProcessing, progress, stats, results, logsRef,
    setInputFile, loadPrices, importPrices, savePrices, processFile, addLog,
  } = useVerification();

  const style = themeStyles[theme];
  const shippingCount = Object.keys(shipping).length;

  useEffect(() => {
    if (!loaded) loadPrices();
  }, []);

  // Sync filename display
  useEffect(() => {
    setSelectedFileName(inputFile?.name || '');
  }, [inputFile]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) { setInputFile(f); addLog(`已拖入文件: ${f.name}`); }
  };

  const handleSelectFile = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setInputFile(f); addLog(`已选择文件: ${f.name}`); }
  };

  const clearFile = () => { setInputFile(null); setSelectedFileName(''); };

  const handlePriceSave = (newPrices: any[], newShipping: any) => {
    savePrices(
      newPrices.map((p: any, i: number) => ({
        id: String(i),
        shop: p.shop || '',
        k1: p.k1 || '',
        code: p.code || '',
        price: typeof p.price === 'number' ? p.price : parseFloat(p.price) || 0,
      })),
      newShipping
    );
    setShowPriceEditor(false);
  };

  return (
    <div className={`min-h-screen ${style.bg} p-6 transition-all duration-500`}>
      <input ref={fileInputRef} type="file" accept=".xlsx,.xls" style={{display:'none'}} onChange={handleFileChange} />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${style.text}`}>核销工具</h1>
            <p className={`text-sm ${style.sub}`}>从发货明细自动生成对账单</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1 p-1.5 rounded-xl ${style.card} shadow-lg backdrop-blur`}>
              {themes.map(t => (
                <button
                  key={t.key}
                  onClick={() => setTheme(t.key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    theme === t.key 
                      ? `bg-gradient-to-r ${t.gradient} text-white shadow-md scale-105` 
                      : `hover:bg-gray-100/50 ${style.text}`
                  }`}
                >
                  <t.icon className="w-4 h-4" />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
            <span className={`px-3 py-1.5 ${style.primaryLight} ${style.accent} rounded-full text-sm font-semibold shadow-sm`}>
              v3
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左栏：价格数据 */}
          <div className={`${style.card} rounded-2xl shadow-xl border ${style.border} p-5 backdrop-blur-sm transition-all duration-300`}>
            <div className={`flex items-center gap-2 mb-4 ${style.text}`}>
              <FileText className={`w-5 h-5 ${style.accent}`} />
              <h2 className="font-semibold">价格数据</h2>
            </div>

            <div className={`mb-4 p-4 ${style.primaryLight} rounded-xl`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-2xl font-bold ${style.text}`}>{prices.length}</p>
                  <p className={`text-sm ${style.sub}`}>条价格数据</p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${style.text}`}>{shippingCount}</p>
                  <p className={`text-sm ${style.sub}`}>家运费</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowPriceEditor(true)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 ${style.primary} text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] mb-4`}
            >
              <Edit3 className="w-4 h-4" />
              <span>编辑价格</span>
            </button>

            <div className={`border ${style.border} rounded-xl overflow-hidden shadow-inner`}>
              <div className="max-h-80 overflow-y-auto scrollbar-thin">
                {prices.length === 0 && (
                  <div className={`p-6 text-center text-sm ${style.sub}`}>暂无价格数据</div>
                )}
                {prices.slice(0, 50).map((item, index) => (
                  <div
                    key={item.id || index}
                    className={`flex items-center justify-between px-4 py-3 text-sm border-b ${style.border} last:border-0 hover:${style.primaryLight} transition-colors`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`font-mono text-xs ${style.sub}`}>{item.shop?.slice(0, 10)}</span>
                      <span className={`text-xs opacity-60 truncate max-w-[80px]`}>({item.k1?.slice(0, 10)})</span>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`font-bold ${style.accent}`}>¥{item.price ?? '?'}</span>
                      <span className={`text-xs ${style.sub} max-w-20 truncate`}>{item.code ?? ''}</span>
                    </div>
                  </div>
                ))}
                {prices.length > 50 && (
                  <div className={`p-3 text-center text-xs ${style.sub}`}>... 还有 {prices.length - 50} 条</div>
                )}
              </div>
            </div>
          </div>

          {/* 右栏：处理区 */}
          <div className={`lg:col-span-2 ${style.card} rounded-2xl shadow-xl border ${style.border} p-5 backdrop-blur-sm transition-all duration-300`}>
            <div className={`flex items-center gap-2 mb-6 ${style.text}`}>
              <Settings className={`w-5 h-5 ${style.accent}`} />
              <h2 className="font-semibold">处理</h2>
            </div>

            <div className="space-y-4 mb-6">
              {/* 文件上传区 */}
              <div
                className={`p-6 border-2 border-dashed ${isDragging ? style.border : 'border-gray-300'} ${isDragging ? style.primaryLight : ''} rounded-2xl transition-all duration-300`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex items-center gap-4">
                  <label className={`w-20 text-sm font-medium ${style.sub}`}>发货明细</label>
                  <div className="flex-1">
                    {selectedFileName ? (
                      <div className={`flex items-center gap-3 p-3 ${style.primaryLight} rounded-xl`}>
                        <FileText className={`w-5 h-5 ${style.accent}`} />
                        <span className={`flex-1 font-medium ${style.text} truncate`}>{selectedFileName}</span>
                        <button onClick={clearFile} className={`p-1 hover:bg-gray-200 rounded transition-colors`}>
                          <X className={`w-4 h-4 ${style.sub}`} />
                        </button>
                        <Check className={`w-5 h-5 text-green-500`} />
                      </div>
                    ) : (
                      <div
                        onClick={handleSelectFile}
                        className={`flex items-center gap-3 p-4 border ${style.border} rounded-xl cursor-pointer hover:${style.primaryLight} transition-all duration-300`}
                      >
                        <Upload className={`w-6 h-6 ${style.accent}`} />
                        <div className="flex-1">
                          <p className={`font-medium ${style.text}`}>点击或拖拽上传发货明细</p>
                          <p className={`text-sm ${style.sub}`}>支持 Excel 格式 (.xlsx, .xls)</p>
                        </div>
                        <button className={`px-4 py-2 ${style.primary} text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all`}>
                          选择文件
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 输出位置 */}
              <div className={`p-6 border ${style.border} rounded-2xl`}>
                <div className="flex items-center gap-4">
                  <label className={`w-20 text-sm font-medium ${style.sub}`}>输出位置</label>
                  <div className="flex-1 flex gap-3">
                    <div className={`flex-1 flex items-center gap-3 p-3 border ${style.border} rounded-xl ${style.card}`}>
                      <FolderOpen className={`w-5 h-5 ${style.accent}`} />
                      <input
                        type="text"
                        value={outputPath}
                        onChange={(e) => setOutputPath(e.target.value)}
                        placeholder="默认：发货明细同目录"
                        className={`flex-1 bg-transparent text-sm ${style.text} placeholder-gray-400 focus:outline-none`}
                      />
                    </div>
                    <button
                      onClick={() => dirInputRef.current?.click()}
                      className={`px-6 py-3 border ${style.border} rounded-xl text-sm font-medium ${style.text} hover:${style.primaryLight} transition-all duration-300`}
                    >
                      选择目录
                    </button>
                    {/* Hidden directory input */}
                    <input
                      ref={dirInputRef}
                      type="file"
                      webkitdirectory
                      style={{display:'none'}}
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          const path = files[0].webkitRelativePath.split('/')[0];
                          setOutputPath(path);
                          addLog('已选择输出目录: ' + path);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 进度条 */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${style.sub}`}>处理状态</span>
                {isProcessing && (
                  <span className={`text-sm font-medium ${style.accent} animate-pulse`}>处理中...</span>
                )}
                {!isProcessing && progress === 100 && (
                  <span className={`text-sm font-medium text-green-500`}>已完成</span>
                )}
              </div>
              <div className={`h-2 ${style.primaryLight} rounded-full overflow-hidden`}>
                <div
                  className={`h-full ${style.primary} transition-all duration-500`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* 日志区 */}
            <div ref={logsRef as any} className="bg-gray-900 rounded-xl p-4 min-h-[180px] max-h-[240px] overflow-y-auto font-mono text-sm shadow-inner">
              {logs.length === 0 ? (
                <span className="text-gray-500">等待处理...</span>
              ) : (
                <div className="space-y-1">
                  {logs.map((log, index) => (
                    <div key={index} className="text-green-400">{log}</div>
                  ))}
                </div>
              )}
            </div>

            {/* 统计信息 */}
            {stats && (
              <div className={`mt-3 p-3 ${style.primaryLight} rounded-xl text-sm ${style.text}`}>
                <div className="flex gap-4">
                  <span>总计: <strong>{stats.total}</strong> 单</span>
                  <span>匹配: <strong>{stats.matched}</strong> 单</span>
                  <span>货款: <strong>¥{stats.goods_total}</strong></span>
                  <span>运费: <strong>¥{stats.ship_total}</strong></span>
                  <span>合计: <strong>¥{stats.grand_total}</strong></span>
                </div>
              </div>
            )}

            {/* 操作按钮 */}
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => importPrices()}
                className={`flex items-center gap-2 px-6 py-3 border ${style.border} rounded-xl text-sm font-medium ${style.text} hover:${style.primaryLight} transition-all duration-300`}
              >
                <FolderOpen className="w-4 h-4" />
                <span>从模板导入</span>
              </button>
              <button
                onClick={processFile}
                disabled={isProcessing || !selectedFileName}
                className={`flex items-center gap-2 px-8 py-3 ${style.primary} text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100`}
              >
                <Play className="w-4 h-4" />
                <span>{isProcessing ? '处理中...' : '开始处理'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className={`mt-6 flex items-center justify-between text-sm ${style.sub}`}>
          <span>价格: {prices.length} 条 | 运费: {shippingCount} 家</span>
          <div className={`h-px flex-1 mx-4 ${style.border.replace('border-', 'bg-')}`} />
        </div>
      </div>

      {/* 价格编辑弹窗 */}
      {showPriceEditor && (
        <PriceEditor
          isOpen={showPriceEditor}
          onClose={() => setShowPriceEditor(false)}
          prices={prices.map(p => ({
            id: p.id || String(Math.random()),
            shop: p.shop || '',
            k1: p.k1 || '',
            code: p.code || '',
            price: p.price || 0,
          }))}
          shipping={shipping}
          onSave={handlePriceSave}
        />
      )}
    </div>
  );
}
