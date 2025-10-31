'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface ButtonCategoryDropdownProps {
  title: string;
  options: string[];
  onSelect?: (option: string) => void;
}

export function ButtonCategoryDropdown({ title, options, onSelect }: ButtonCategoryDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect?.(option);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between gap-2 px-5 py-3 rounded-full border bg-[#D9D9D9]  hover:bg-gray-300  transition-colors font-medium "
      >
        <span>{selected || title}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-[1000] animate-fadeIn min-w-[180px] p-3"
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}