interface TableTextProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TableText = ({ children, className = "", onClick }: TableTextProps) => (
  <span 
    className={`text-base font-medium text-black text-start block transition-colors duration-300 flex-1 ${className} ${onClick ? 'cursor-pointer' : ''}`}
    onClick={onClick}
  >
    {children}
  </span>
);