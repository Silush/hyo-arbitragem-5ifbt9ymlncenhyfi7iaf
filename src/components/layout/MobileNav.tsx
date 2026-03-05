import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, Trophy, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
export function MobileNav() {
  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Início' },
    { to: '/rings', icon: LayoutGrid, label: 'Competição' },
    { to: '/ranking', icon: Trophy, label: 'Ranking' },
    { to: '/rules', icon: BookOpen, label: 'Regras' },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t h-16 md:hidden shadow-[0_-4px_15px_rgba(0,0,0,0.1)]">
      <div className="flex h-full items-center justify-around">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "group flex flex-col items-center justify-center w-full h-full gap-1 transition-all relative overflow-hidden",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            <Icon className="w-5 h-5 transition-transform group-active:scale-90" />
            <span className="text-[9px] font-black uppercase tracking-wider">{label}</span>
            <span className={cn(
              "absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-primary rounded-t-full transition-all duration-300 origin-bottom",
              "scale-x-0 group-aria-[current=page]:scale-x-100"
            )} />
          </NavLink>
        ))}
      </div>
    </nav>
  );
}