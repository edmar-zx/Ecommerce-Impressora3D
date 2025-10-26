import React, { useState, useRef, useEffect } from "react";
/* import { Dropdown, DropdownList, DropdownItem } from "./styles";
import { FieldWrapper, Text, Input } from "../Modal/styles"; */

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
      <span className="text-[16px] font-bold text-black text-left mb-2.5">{label}</span>
      <div className="relative w-full">
        <input
          type="text"
          placeholder={label}
          value={value || ""}
          readOnly
          disabled={disabled}
          onClick={() => !disabled && setOpen(!open)}
          className="p-5 mb-1 rounded-lg bg-[#f5f5f5] border-none shadow-sm w-full box-border cursor-pointer"
        />
        {open && !disabled && (
          <ul className="absolute top-full left-0 w-full max-h-[200px] overflow-y-auto bg-white border border-solid border-[#ccc] rounded-lg m-0 p-0 list-none z-10">
            {options.map((opt) => (
              <li 
                key={opt} 
                onClick={() => handleSelect(opt)}
                className="p-2.5 cursor-pointer hover:bg-[#f0f0f0]"
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
