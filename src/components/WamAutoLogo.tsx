import React from 'react';

interface WamAutoLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const WamAutoLogo: React.FC<WamAutoLogoProps> = ({ 
  className = "", 
}) => {
  return (
    <div className={`inline-flex items-center gap-3.5 shrink-0 ${className}`}>
      <div className="flex flex-col leading-tight select-none">
        <div className="flex items-center gap-1.5">
          <span className="font-display font-black text-2xl tracking-tight text-white drop-shadow-sm group-hover:text-amber-400 transition-colors">
            WAM
          </span>
          <span className="font-display font-black text-2xl tracking-tight text-amber-400 drop-shadow-sm">
            AUTO
          </span>
        </div>
        <span className="text-[11px] uppercase font-bold tracking-wider text-neutral-400">
          Diagnostic à domicile · 59
        </span>
      </div>
    </div>
  );
};
