import React from "react";

type CardsProps = {
    emoji: React.ReactNode;
    title: string;
    value: string | number;
};

export function Cards({ emoji, title, value }: CardsProps) {
    return (
        <div className="p-5 bg-white w-[23%] rounded-xl max-h-[200px] min-h-[150px]">
            <div className="flex items-center justify-between mb-2.5">
                 <span className="text-3xl mr-2 flex items-center">{emoji}</span>
                 <strong className="text-4xl font-bold text-black">{value}</strong>
            </div>
            <h3 className="text-2xl font-bold text-black mt-7.5">{title}</h3>
        </div>
    );
}