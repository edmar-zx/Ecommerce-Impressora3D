interface TableTextProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TableText = ({ children, className = "", onClick }: TableTextProps) => (
  <span 
    className={`text-base font-medium text-black text-start block flex-1 
      transition-colors duration-300 
      overflow-hidden whitespace-nowrap truncate 
      ${className} ${onClick ? 'cursor-pointer' : ''}`}
    onClick={onClick}
  >
    {children}
  </span>
);