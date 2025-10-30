import React from "react";

interface ButtonSelectProps {
  title: string;
  onClick?: () => void;
  active?: boolean;
}

export function ButtonSelect({ title, onClick, active = false }: ButtonSelectProps) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 rounded-full border transition-colors font-medium
        ${active
          ? "bg-[#2C2C2C] text-white border-[#2C2C2C]"
          : " text-[#2C2C2C] bg-[#D9D9D9] hover:bg-gray-300"
        }`}
    >
      {title}
    </button>
  );
}
