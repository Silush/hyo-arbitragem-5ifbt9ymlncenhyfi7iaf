import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api-client';
import { Athlete, Modality } from '@shared/types';
import { Trophy, Search, Award, Star, Swords, Target, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
export function RankingPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<Modality | 'ALL'>('ALL');
  const { data: athletes, isLoading } = useQuery({
    queryKey: ['athletes'],
    queryFn: () => api<Athlete[]>('/api/athletes')
  });
  const sortedAthletes = useMemo(() => {
    if (!athletes) return [];
    return [...athletes].sort((a, b) => {
      const ptsA = activeTab === 'ALL' ? (a.points || 0) : (a.modalityPoints?.[activeTab] || 0);
      const ptsB = activeTab === 'ALL' ? (b.points || 0) : (b.modalityPoints?.[activeTab] || 0);
      return ptsB - ptsA;
    });
  }, [athletes, activeTab]);
  const filteredAthletes = useMemo(() => {
    return sortedAthletes.filter(a =>
      (a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.club.toLowerCase().includes(search.toLowerCase())) &&
      (activeTab === 'ALL' ? true : (a.modalityPoints?.[activeTab] || 0) > 0)
    );
  }, [sortedAthletes, search, activeTab]);
  const tabs = [
    { id: 'ALL', label: 'Geral', icon: Trophy },
    { id: 'FORMAS_TRADICIONAIS', label: 'Fórmula', icon: Star },
    { id: 'ARMAS', label: 'Armas', icon: Swords },
    { id: 'SPARRING', label: 'Sparring', icon: Target },
    { id: 'AVANCADO_PRETAS', label: 'Combat', icon: Zap },
  ];
  return (
    <AppLayout title="RANKING NACIONAL" showBack>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-8">
          <TabsList className="flex flex-wrap h-auto bg-muted p-1 rounded-none border-2 border-black w-full">
            {tabs.map(tab => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id} 
                className="flex-1 min-w-[100px] font-black uppercase text-[10px] rounded-none py-3 data-[state=active]:bg-black data-[state=active]:text-white"
              >
                <tab.icon className="w-3 h-3 mr-2 hidden xs:block" /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou equipe..."
              className="pl-12 h-14 border-2 border-black rounded-none font-bold uppercase"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="space-y-4">
            {isLoading && (
              <div className="py-20 text-center font-black uppercase italic animate-pulse">Sincronizando Banco de Dados...</div>
            )}
            {!isLoading && filteredAthletes.map((athlete, index) => {
              const displayPoints = activeTab === 'ALL' ? (athlete.points || 0) : (athlete.modalityPoints?.[activeTab] || 0);
              const rankPos = index + 1;
              const isTop4 = rankPos <= 4;
              return (
                <Card key={athlete.id} className={cn(
                  "border-2 rounded-none transition-all overflow-hidden",
                  isTop4 ? "border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" : "border-black/10"
                )}>
                  <CardContent className="p-4 flex items-center gap-6">
                    <div className={cn(
                      "w-14 h-14 flex items-center justify-center font-black italic shrink-0 border-2 border-black",
                      rankPos === 1 ? "bg-black text-white scale-110" : "bg-white text-black"
                    )}>
                      #{rankPos}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-lg uppercase italic tracking-tighter truncate">{athlete.name}</span>
                        {isTop4 && <Award className="w-5 h-5 text-amber-500 shrink-0" />}
                      </div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase truncate">
                        {athlete.club} • {athlete.belt}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black italic leading-none tabular-nums">{displayPoints}</div>
                      <div className="text-[9px] font-black uppercase opacity-40 mt-1">Pontos</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            {!isLoading && filteredAthletes.length === 0 && (
              <div className="py-20 text-center border-2 border-dashed border-black/10">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Nenhum registro nesta categoria</p>
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
}