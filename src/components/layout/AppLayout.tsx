import React, { useEffect } from "react";
import { ChevronLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BrandLogo } from "@/components/BrandLogo";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";
type AppLayoutProps = {
  children: React.ReactNode;
  container?: boolean;
  className?: string;
  contentClassName?: string;
  title?: string;
  showBack?: boolean;
};
export function AppLayout({
  children,
  container = false,
  className,
  contentClassName,
  title = "HYO Arbitragem",
  showBack = false
}: AppLayoutProps): JSX.Element {
  const roleRef = React.useRef(localStorage.getItem('user_role'));
  useEffect(() => {
    if (!roleRef.current) {
      window.location.replace('/');
    }
  }, []);
  const roleLabels: Record<string, string> = {
    referee: 'Árbitro',
    table: 'Mesa',
    coordinator: 'Mestre',
    student: 'Atleta',
  };
  const handleLogout = () => {
    localStorage.removeItem('user_role');
    localStorage.removeItem('athlete_id');
    window.location.replace('/');
  };
  return (
    <div className={cn("min-h-screen bg-background flex flex-col font-sans selection:bg-black selection:text-white", className)}>
      <header className="h-16 border-b-2 border-black dark:border-white flex items-center sticky top-0 bg-background/95 backdrop-blur-md z-40 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBack && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.history.back()}
                className="h-10 w-10 border border-black dark:border-white rounded-none"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}
            <div className="flex items-center gap-3">
              <BrandLogo size="sm" className="hidden xs:block" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-foreground uppercase tracking-widest leading-tight">{title}</span>
                <div className="mt-0.5">
                  <span className="text-[8px] px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black font-black uppercase ring-1 ring-black/10 dark:ring-white/50">
                    {roleLabels[roleRef.current || ''] || 'Acesso'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle className="relative top-0 right-0" />
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-foreground hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors rounded-none"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full">
        <div className={cn(
          "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10",
          container && "max-w-md px-4",
          "pb-24"
        )}>
          <div className={cn("w-full", contentClassName)}>
            {children}
          </div>
        </div>
      </main>
      <MobileNav />
      <footer className="border-t-2 border-black dark:border-white bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-16 md:mb-0 text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-8 items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              <a href="https://hyomartialarts.com/" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors">Site</a>
              <a href="https://instagram.com/hyomartialarts/" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors">Instagram</a>
              <a href="https://wa.me/5545991142138" target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors">WhatsApp</a>
            </div>
            <div className="pt-6 border-t border-black/10 dark:border-white/10 w-full max-w-xs">
              <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em]">
                HYO PERFORMANCE © 2024
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}