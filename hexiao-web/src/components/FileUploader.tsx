import React, { useRef, useState } from 'react';
import { Upload, File, X, Check } from 'lucide-react';

interface FileUploaderProps {
  label: string;
  placeholder: string;
  buttonText: string;
  value?: string;
  onChange?: (file: File | null) => void;
  accept?: string;
}

export function FileUploader({
  label,
  placeholder,
  buttonText,
  value,
  onChange,
  accept = '.xlsx,.xls',
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      onChange?.(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onChange?.(file);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    onChange?.(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center gap-4">
      <label className="w-20 text-sm text-gray-600 dark:text-gray-400">
        {label}
      </label>
      <div
        className={`flex-1 flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-all cursor-pointer ${
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />
        {selectedFile ? (
          <>
            <File className="w-4 h-4 text-green-500" />
            <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 truncate">
              {selectedFile.name}
            </span>
            <Check className="w-4 h-4 text-green-500" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 text-gray-400" />
            <span className="flex-1 text-sm text-gray-400">
              {placeholder}
            </span>
          </>
        )}
      </div>
      <button
        onClick={handleClick}
        className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
}
