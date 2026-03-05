import React from "react";
import { useI18nStore, useI18n } from "@/hooks/use-i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages, Check } from "lucide-react";
import { Language } from "@shared/translations";
import { cn } from "@/lib/utils";
export function LanguageSwitcher() {
  const currentLang = useI18nStore((s) => s.lang);
  const setLang = useI18nStore((s) => s.setLang);
  const { t } = useI18n();
  const options: { label: string; value: Language }[] = [
    { label: "Português", value: "pt" },
    { label: "English", value: "en" },
    { label: "Español", value: "es" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-accent transition-colors border">
          <Languages className="h-5 w-5" />
          <span className="sr-only">Switch Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 p-2 rounded-xl">
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => setLang(opt.value)}
            className={cn(
              "flex items-center justify-between px-3 py-2.5 rounded-lg font-bold text-sm cursor-pointer transition-colors",
              currentLang === opt.value ? "bg-primary text-primary-foreground" : "hover:bg-accent"
            )}
          >
            {opt.label}
            {currentLang === opt.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}