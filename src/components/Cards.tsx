import React from "react";
import { LucideIcon } from "lucide-react";

type CardsProps = {
  icon: LucideIcon;
  title: string;
  value: string | number;
  color?: "blue" | "green" | "amber" | "purple" | "red";
};

export function Cards({ icon: Icon, title, value}: CardsProps) {


  return (
    <div className="group p-6 w-[23%] bg-[#27292D] rounded-2xl text-white hover:-translate-y-1 max-h-[200px] min-h-[150px] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-2 rounded-xl text-[#E74C3C] bg-white `}
        >
          <Icon className="w-6 h-6" />
        </div>
        <strong className="text-4xl font-bold ">
          {value}
        </strong>
      </div>
      <div className="mt-auto">
        <h3 className="text-lg font-semibold ">
          {title}
        </h3>
        <div
          className={`w-12 h-1 bg-gradient-to-r from-[#E74C3C] to-[#007BFF] rounded-full mt-2 group-hover:w-full transition-all duration-300`}
        ></div>
      </div>
    </div>
  );
}
