import React, { useState } from 'react';
import { cn } from '@/lib/utils';
interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
export function BrandLogo({ size = 'md', className }: BrandLogoProps) {
  const [error, setError] = useState(false);
  const containerSizes = {
    sm: 'max-w-[100px] border border-black dark:border-white',
    md: 'max-w-[180px] border-2 border-black dark:border-white',
    lg: 'max-w-[280px] border-2 border-black dark:border-white',
  };
  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };
  const subTextSizes = {
    sm: 'text-[5px]',
    md: 'text-[7px]',
    lg: 'text-[9px]',
  };
  return (
    <div className={cn(
      "relative bg-background overflow-hidden transition-all hover:scale-[1.02] duration-300",
      containerSizes[size],
      className
    )}>
      <div className="bg-background flex items-center justify-center relative">
        {!error ? (
          <img
            src="https://placehold.co/600x200/000000/FFFFFF?text=HYO+TAEKWONDO"
            alt="HYO Taekwondo"
            className="w-full h-auto block object-contain dark:invert"
            onError={() => setError(true)}
          />
        ) : (
          <div className="flex flex-col items-center py-4 px-6 bg-background w-full">
            <div className="flex items-center gap-2">
               <span className={cn("font-black tracking-tighter leading-none", textSizes[size])}>
                 HYO
               </span>
               <span className={cn("font-bold text-[#D21034]", textSizes[size])}>효</span>
            </div>
            <span className={cn(
              "font-black uppercase tracking-[0.3em] text-muted-foreground mt-1",
              subTextSizes[size]
            )}>
              Association
            </span>
          </div>
        )}
      </div>
    </div>
  );
}