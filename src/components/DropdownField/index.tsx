import React, { useState, useRef, useEffect } from "react";
import { Dropdown, DropdownList, DropdownItem } from "./styles";
import { FieldWrapper, Text, Input } from "../Modal/styles";

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
    <FieldWrapper ref={dropdownRef}>
      <Text>{label}</Text>
      <Dropdown>
        <Input
          type="text"
          placeholder={label}
          value={value || ""}
          readOnly
          disabled={disabled}
          onClick={() => !disabled && setOpen(!open)}
        />
        {open && !disabled && (
          <DropdownList>
            {options.map((opt) => (
              <DropdownItem key={opt} onClick={() => handleSelect(opt)}>
                {opt}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </Dropdown>
    </FieldWrapper>
  );
}
