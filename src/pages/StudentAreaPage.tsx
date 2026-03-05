import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, BookOpen, Phone, UserX, Star, ShieldCheck, Instagram, Globe, Clock, Users } from 'lucide-react';
import { MOCK_CONTACTS } from '@shared/mock-data';
import { api } from '@/lib/api-client';
import { Athlete, Match } from '@shared/types';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
export function StudentAreaPage() {
  const athleteId = localStorage.getItem('athlete_id') || 'a1';
  const { data: athletes, isLoading } = useQuery({
    queryKey: ['athletes'],
    queryFn: () => api<Athlete[]>('/api/athletes')
  });
  const { data: matches, isLoading: isLoadingMatches } = useQuery({
    queryKey: ['matches', athleteId],
    queryFn: () => api<Match[]>(`/api/matches?athleteId=${athleteId}`),
    enabled: !!athleteId
  });
  const currentAthlete = athletes?.find(a => a.id === athleteId);
  const sortedAthletes = useMemo(() => {
    if (!athletes) return [];
    return [...athletes].sort((a, b) => b.points - a.points);
  }, [athletes]);
  const rankPosition = useMemo(() => {
    if (!athletes || !athleteId) return null;
    const index = sortedAthletes.findIndex(a => a.id === athleteId);
    return index >= 0 ? index + 1 : sortedAthletes.length + 1;
  }, [sortedAthletes, athleteId, athletes]);
  const activeMatches = matches?.filter(m => m.status === 'Active' || m.status === 'Calling') || [];
  const getOpponentName = (match: Match) => {
    const oppId = match.athleteBlueId === athleteId ? match.athleteRedId : match.athleteBlueId;
    return athletes?.find(a => a.id === oppId)?.name || 'Atleta TBD';
  };
  if (isLoading) return <AppLayout container title="Área do Aluno" showBack><div className="p-20 text-center">...</div></AppLayout>;
  if (!currentAthlete) {
    return (
      <AppLayout container title="Perfil" showBack>
        <div className="text-center py-20 space-y-6">
          <UserX className="w-16 h-16 mx-auto opacity-20" />
          <h2 className="text-xl font-black uppercase italic">Vínculo não encontrado</h2>
          <Button variant="outline" className="h-14 font-black w-full" onClick={() => window.open('https://wa.me/5545991142138')}>FALAR COM A SECRETARIA</Button>
        </div>
      </AppLayout>
    );
  }
  return (
    <AppLayout container title="ÁREA DO ALUNO" showBack>
      <div className="space-y-10">
        <section className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
             <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> Performance Nacional
          </h3>
          <Card className="bg-slate-900 text-white border-none shadow-xl rounded-none">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-2xl font-black uppercase tracking-tight italic">{currentAthlete.name}</div>
                  <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-1">
                    {currentAthlete.belt} • {currentAthlete.club}
                  </div>
                </div>
                <Badge className={cn("font-black uppercase text-[10px] rounded-none", rankPosition! <= 4 ? "bg-amber-500 text-black" : "bg-blue-600")}>
                  {rankPosition! <= 4 ? 'TOP FOUR' : 'Classificado'}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 text-center border border-white/5">
                  <div className="text-3xl font-black mb-1">{currentAthlete.points}</div>
                  <div className="text-[8px] font-black uppercase opacity-60">Pontos</div>
                </div>
                <div className="bg-white/10 p-4 text-center border border-white/5">
                  <div className="text-3xl font-black mb-1">#{rankPosition}</div>
                  <div className="text-[8px] font-black uppercase opacity-60">Ranking</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        {activeMatches.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Clock className="w-3 h-3 text-red-600" /> Chamadas Ativas
            </h3>
            {activeMatches.map(match => (
              <Card key={match.id} className="border-2 border-primary rounded-none shadow-lg animate-pulse">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] font-black uppercase bg-primary text-white px-2 py-0.5 inline-block mb-1">{match.status}</div>
                    <div className="font-black uppercase text-sm italic">Vs {getOpponentName(match)}</div>
                  </div>
                  <Button size="sm" asChild className="font-black text-[10px] rounded-none"><Link to={`/match/${match.id}`}>VER PLACAR</Link></Button>
                </CardContent>
              </Card>
            ))}
          </section>
        )}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Guia do Atleta</h3>
          </div>
          <Link to="/uniformes" className="block">
            <Card className="border-2 border-black rounded-none hover:bg-black hover:text-white transition-all">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <BookOpen className="w-6 h-6 text-blue-600" />
                   <span className="font-black uppercase italic text-xs">Manual de Uniformes e Conduta</span>
                </div>
                <Badge variant="outline" className="rounded-none border-black group-hover:border-white">PDF</Badge>
              </CardContent>
            </Card>
          </Link>
        </section>
        <section className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Suporte HYO</h3>
          <div className="grid grid-cols-1 gap-3">
            <Button onClick={() => window.open('https://wa.me/5545991142138')} className="h-14 font-black uppercase rounded-none bg-[#25D366] hover:bg-[#128C7E] border-none"><MessageSquare className="mr-2" /> WhatsApp Oficial</Button>
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => window.open('https://instagram.com/hyomartialarts/')} variant="outline" className="h-14 font-black uppercase rounded-none border-2"><Instagram className="mr-2 w-4 h-4" /> Instagram</Button>
              <Button onClick={() => window.open('https://hyomartialarts.com/')} variant="outline" className="h-14 font-black uppercase rounded-none border-2"><Globe className="mr-2 w-4 h-4" /> Site</Button>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}