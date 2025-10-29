import React, { useState, useRef, useEffect } from "react";

interface DropdownFieldProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function DropdownField({
  label,
  options,
  value,
  onChange,
  disabled = false,
}: DropdownFieldProps) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    if (!disabled) {
      onChange(option);
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="flex flex-col items-start w-full">
      <label className="text-sm font-bold text-gray-700 text-left mb-2">{label}</label>
      <div className="relative w-full">
        <input
          type="text"
          placeholder={`Selecione ${label}`}
          value={value || ""}
          readOnly
          disabled={disabled}
          onClick={() => !disabled && setOpen(!open)}
          className="p-4 rounded-xl bg-gray-50 border border-gray-200 w-full box-border focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {open && !disabled && (
          <ul className="absolute top-full left-0 w-full max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-xl mt-1 shadow-lg z-10">
            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => handleSelect(opt)}
                className="p-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}