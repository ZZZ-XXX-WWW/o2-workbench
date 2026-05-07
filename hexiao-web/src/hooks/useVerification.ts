import { useState, useCallback, useRef } from 'react';

const API = '';  // Same origin (webpack proxy → localhost:8527)

export interface PriceItem {
  id: string;
  shop: string;
  k1: string;
  code: string;
  price: number | null;
  n?: number; // normal shipping
  r?: number; // remote shipping
}

export function useVerification() {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [shipping, setShipping] = useState<Record<string, {n:number;r:number}>>({});
  const [loaded, setLoaded] = useState(false);
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const logsRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, msg]);
    setTimeout(() => logsRef.current?.scrollTo(0, logsRef.current.scrollHeight), 50);
  };

  // Load prices from backend
  const loadPrices = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/hexiao/prices`);
      const data = await res.json();
      const pl = (data.prices || []).map((p: any, i: number) => ({
        ...p, id: String(i)
      }));
      setPrices(pl);
      setShipping(data.shipping || {});
      setLoaded(true);
      addLog(`已加载 ${pl.length} 条价格, ${Object.keys(data.shipping||{}).length} 家运费`);
    } catch(e) {
      addLog('加载价格失败: '+e);
    }
  }, []);

  // Import from template
  const importPrices = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/hexiao/prices/import`, {method:'POST'});
      const data = await res.json();
      const pl = (data.prices || []).map((p: any, i: number) => ({...p, id: String(i)}));
      setPrices(pl); setShipping(data.shipping || {});
      addLog(`从模板导入 ${pl.length} 条`);
    } catch(e) { addLog('导入失败: '+e); }
  }, []);

  // Save prices
  const savePrices = useCallback(async (newPrices: PriceItem[], newShipping?: Record<string, {n:number; r:number}>) => {
    try {
      const pl = newPrices.map(({id, ...rest}) => rest);
      const shipToSave = newShipping || shipping;
      const res = await fetch(`${API}/api/hexiao/prices/save`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({prices: pl, shipping: shipToSave}),
      });
      const data = await res.json();
      addLog(`已保存 ${data.count} 条`);
      setPrices(newPrices);
      if (newShipping) setShipping(newShipping);
    } catch(e) { addLog('保存失败: '+e); }
  }, []);

  // Process file
  const processFile = useCallback(async () => {
    if (!inputFile) { addLog('请先选择文件'); return; }
    setIsProcessing(true); setProgress(0); setStats(null); setResults([]);
    addLog('开始处理...');
    try {
      const form = new FormData();
      form.append('file', inputFile);
      const res = await fetch(`${API}/api/hexiao/process`, {method:'POST', body: form});
      const data = await res.json();
      setResults(data.results || []);
      setStats(data.stats);
      setProgress(100);
      addLog(`完成！${data.stats?.total || 0} 单, 匹配 ${data.stats?.matched || 0} 单`);
      addLog(`合计: ¥${data.stats?.grand_total || 0}`);
    } catch(e) {
      addLog('处理失败: '+e);
    }
    setIsProcessing(false);
  }, [inputFile]);

  return {
    prices, shipping, loaded, inputFile, logs, isProcessing, progress, stats, results, logsRef,
    setInputFile, loadPrices, importPrices, savePrices, processFile, addLog,
  };
}
