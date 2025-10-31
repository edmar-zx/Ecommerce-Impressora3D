import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBoxProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function SearchBox({ value, onChange, placeholder }: SearchBoxProps) {
  return (
    <form className="relative inline-block flex-1 min-w-[200px]">
      <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#888]" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="py-4 px-4 pl-12 bg-white rounded-lg border border-[#777] w-full max-w-[500px]"
      />
    </form>
  );
}