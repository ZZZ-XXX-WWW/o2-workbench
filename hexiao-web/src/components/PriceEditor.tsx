import React, { useState, useRef } from 'react';
import { X, Search, Plus, Trash2, Edit2, Check } from 'lucide-react';

interface PriceItem {
  id: string;
  shop: string;
  k1: string;
  code: string;
  price: number;
  n?: number;
  r?: number;
}

interface PriceEditorProps {
  isOpen: boolean;
  onClose: () => void;
  prices: PriceItem[];
  shipping: Record<string, {n: number; r: number}>;
  onSave: (prices: PriceItem[], shipping: Record<string, {n:number; r:number}>) => void;
}

export default function PriceEditor({ isOpen, onClose, prices: rawPrices, shipping, onSave }: PriceEditorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PriceItem>>({});
  const tableRef = useRef<HTMLDivElement>(null);

  // Merge shipping into each row
  const [localPrices, setLocalPrices] = useState<PriceItem[]>(() =>
    rawPrices.map(p => ({
      ...p,
      n: p.n ?? shipping[p.shop]?.n ?? 2.5,
      r: p.r ?? shipping[p.shop]?.r ?? 10,
    }))
  );

  if (!isOpen) return null;

  const filteredPrices = localPrices.filter(
    p => p.shop.includes(searchQuery) || p.k1.includes(searchQuery) || p.code.includes(searchQuery)
  );

  const handleEdit = (item: PriceItem) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    setLocalPrices(prev =>
      prev.map(p => (p.id === editingId ? { ...p, ...editForm } as PriceItem : p))
    );
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    setLocalPrices(prev => prev.filter(p => p.id !== id));
  };

  const handleAdd = () => {
    const newItem: PriceItem = {
      id: Date.now().toString(),
      shop: '',
      k1: '',
      code: '',
      price: 0,
      n: 2.5,
      r: 10,
    };
    setLocalPrices(prev => [...prev, newItem]);
    setEditingId(newItem.id);
    setEditForm(newItem);
    // Auto-scroll to this row
    setTimeout(() => {
      if (tableRef.current) {
        tableRef.current.scrollTop = tableRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleSaveAll = () => {
    // Extract shipping from rows
    const newShipping: Record<string, {n:number; r:number}> = {};
    localPrices.forEach(p => {
      if (p.shop) {
        if (!newShipping[p.shop]) newShipping[p.shop] = { n: 2.5, r: 10 };
        newShipping[p.shop].n = p.n ?? newShipping[p.shop].n;
        newShipping[p.shop].r = p.r ?? newShipping[p.shop].r;
      }
    });
    onSave(localPrices, newShipping);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-[900px] max-h-[85vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold">编辑价格与运费</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="搜索客户、款号或编码..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border dark:border-gray-600 rounded-lg bg-transparent"
              />
            </div>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-1 hover:bg-blue-600"
            >
              <Plus size={16} /> 新增
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4" ref={tableRef}>
          <table className="w-full">
            <thead className="text-sm text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
              <tr>
                <th className="text-left py-2">客户</th>
                <th className="text-left py-2">款号</th>
                <th className="text-left py-2">编码</th>
                <th className="text-left py-2 w-[80px]">单价</th>
                <th className="text-left py-2 w-[90px]">普通运费</th>
                <th className="text-left py-2 w-[90px]">偏远运费</th>
                <th className="text-right py-2 w-[60px]">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrices.map(item => (
                <tr key={item.id} className="border-b dark:border-gray-700 last:border-0">
                  {editingId === item.id ? (
                    <>
                      <td className="py-2">
                        <input value={editForm.shop || ''} onChange={e => setEditForm({...editForm, shop: e.target.value})}
                          className="w-full px-2 py-1 border dark:border-gray-600 rounded text-sm" />
                      </td>
                      <td className="py-2">
                        <input value={editForm.k1 || ''} onChange={e => setEditForm({...editForm, k1: e.target.value})}
                          className="w-full px-2 py-1 border dark:border-gray-600 rounded text-sm" />
                      </td>
                      <td className="py-2">
                        <input value={editForm.code || ''} onChange={e => setEditForm({...editForm, code: e.target.value})}
                          className="w-full px-2 py-1 border dark:border-gray-600 rounded text-sm" />
                      </td>
                      <td className="py-2">
                        <input type="number" step="0.01" value={editForm.price ?? 0}
                          onChange={e => setEditForm({...editForm, price: parseFloat(e.target.value) || 0})}
                          className="w-full px-2 py-1 border dark:border-gray-600 rounded text-sm" />
                      </td>
                      <td className="py-2">
                        <input type="number" step="0.1" value={editForm.n ?? 2.5}
                          onChange={e => setEditForm({...editForm, n: parseFloat(e.target.value) || 0})}
                          className="w-full px-2 py-1 border dark:border-gray-600 rounded text-sm" />
                      </td>
                      <td className="py-2">
                        <input type="number" step="0.1" value={editForm.r ?? 10}
                          onChange={e => setEditForm({...editForm, r: parseFloat(e.target.value) || 0})}
                          className="w-full px-2 py-1 border dark:border-gray-600 rounded text-sm" />
                      </td>
                      <td className="py-2 text-right">
                        <button onClick={handleSaveEdit} className="p-1 text-green-500 hover:bg-green-50 rounded">
                          <Check size={16} />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 text-sm max-w-[120px] truncate">{item.shop}</td>
                      <td className="py-2 text-sm max-w-[100px] truncate">{item.k1}</td>
                      <td className="py-2 text-sm max-w-[100px] truncate">{item.code}</td>
                      <td className="py-2 text-sm font-semibold">¥{(item.price ?? 0).toFixed(2)}</td>
                      <td className="py-2 text-sm">¥{(item.n ?? 2.5).toFixed(1)}</td>
                      <td className="py-2 text-sm">¥{(item.r ?? 10).toFixed(1)}</td>
                      <td className="py-2 text-right whitespace-nowrap">
                        <button onClick={() => handleEdit(item)} className="p-1 text-blue-500 hover:bg-blue-50 rounded mr-1">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-1 text-red-500 hover:bg-red-50 rounded">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {filteredPrices.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-sm text-gray-400">
                    {searchQuery ? '无匹配结果' : '暂无价格数据'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t dark:border-gray-700 flex justify-between items-center">
          <span className="text-sm text-gray-400">共 {localPrices.length} 条</span>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              取消
            </button>
            <button onClick={handleSaveAll} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
