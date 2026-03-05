import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { api } from '@/lib/api-client';
import { Ring, Match, Athlete, Modality, RingParticipant } from '@shared/types';
import { UserPlus, Shuffle, Search, Star, Swords, Target, Zap, ChevronRight, Info } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
export function RingManagerPage() {
  const { ringId } = useParams();
  const queryClient = useQueryClient();
  const [athleteSearch, setAthleteSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [selectedMods, setSelectedMods] = useState<Modality[]>([]);
  const { data: ring } = useQuery({ queryKey: ['ring', ringId], queryFn: () => api<Ring>(`/api/rings/${ringId}`) });
  const { data: matches } = useQuery({ queryKey: ['matches', ringId], queryFn: () => api<Match[]>(`/api/matches?ringId=${ringId}`) });
  const { data: athletes } = useQuery({ queryKey: ['athletes'], queryFn: () => api<Athlete[]>('/api/athletes') });
  const addAthleteMutation = useMutation({
    mutationFn: (participant: RingParticipant) =>
      api(`/api/rings/${ringId}/athletes`, { method: 'POST', body: JSON.stringify({ participants: [participant] }) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ring', ringId] });
      toast.success("Inscrição efetuada.");
      setSelectedAthlete(null);
      setSelectedMods([]);
      setIsDialogOpen(false);
    },
    onError: (e: any) => toast.error(e.message)
  });
  const drawMutation = useMutation({
    mutationFn: () => api(`/api/rings/${ringId}/draw`, { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ring', ringId] });
      queryClient.invalidateQueries({ queryKey: ['matches', ringId] });
      toast.success("Fila sequencial oficial gerada.");
    },
    onError: (e: any) => toast.error(e.message)
  });
  const filteredSearch = useMemo(() => {
    if (!athletes || !athleteSearch) return [];
    return athletes.filter(a =>
      a.name.toLowerCase().includes(athleteSearch.toLowerCase()) ||
      a.club.toLowerCase().includes(athleteSearch.toLowerCase())
    ).slice(0, 5);
  }, [athletes, athleteSearch]);
  const modIcons: Record<Modality, any> = {
    FORMAS_TRADICIONAIS: Star,
    ARMAS: Swords,
    SPARRING: Target,
    AVANCADO_PRETAS: Zap,
    COMBATE_ARMADO: Swords,
  };
  const isAthleteInRing = (id: string) => ring?.participants?.some(p => p.athleteId === id);
  return (
    <AppLayout title={ring?.name || 'Arena'} showBack>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        <header className="flex flex-col md:flex-row justify-between items-start gap-8 border-b-2 border-black pb-8">
          <div>
            <h2 className="text-5xl font-black italic tracking-tighter uppercase">ARENA {ring?.letter}</h2>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge className="rounded-none font-black uppercase text-[9px] bg-black text-white">{ring?.ageRange}</Badge>
              {ring?.supportedModalities.map(m => (
                <Badge key={m} variant="outline" className="rounded-none border-black font-black uppercase text-[8px] italic opacity-60">
                  {m.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="h-14 px-8 rounded-none border-2 border-black font-black uppercase italic gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <UserPlus className="w-5 h-5" /> Vincular Atleta
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-none border-2 border-black max-w-xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black uppercase italic">Vínculo de Atleta</DialogTitle>
                <DialogDescription className="text-xs font-bold uppercase">Busque por nome ou academia para registrar participações.</DialogDescription>
              </DialogHeader>
              <div className="py-6 space-y-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Nome, Equipe ou Graduação..."
                    className="h-14 pl-12 border-2 border-black rounded-none font-bold uppercase"
                    value={athleteSearch}
                    onChange={e => setAthleteSearch(e.target.value)}
                  />
                  {filteredSearch.length > 0 && !selectedAthlete && (
                    <div className="absolute top-full left-0 right-0 bg-white border-2 border-black z-10 shadow-xl max-h-60 overflow-y-auto">
                      {filteredSearch.map(a => (
                        <div
                          key={a.id}
                          className={cn(
                            "p-4 hover:bg-black hover:text-white cursor-pointer transition-colors border-b last:border-0",
                            isAthleteInRing(a.id) && "opacity-40 cursor-not-allowed"
                          )}
                          onClick={() => {
                            if (!isAthleteInRing(a.id)) {
                              setSelectedAthlete(a);
                              setAthleteSearch('');
                            } else {
                              toast.warning("Atleta já vinculado a esta arena.");
                            }
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <p className="font-black uppercase italic text-sm">{a.name}</p>
                            <span className="text-[8px] font-black uppercase bg-muted/20 px-1 py-0.5">{a.belt}</span>
                          </div>
                          <p className="text-[10px] uppercase font-bold opacity-60 mt-1">{a.club} • {a.age} anos</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {selectedAthlete && (
                  <div className="space-y-6 animate-in fade-in">
                    <div className="p-4 bg-muted/50 border-2 border-black flex justify-between items-center">
                      <div>
                        <span className="font-black uppercase italic text-sm">{selectedAthlete.name}</span>
                        <p className="text-[9px] font-bold opacity-50">{selectedAthlete.club}</p>
                      </div>
                      <Button variant="ghost" className="text-xs font-black underline" onClick={() => setSelectedAthlete(null)}>Trocar</Button>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">Modalidades para esta Arena</p>
                      <div className="grid gap-2">
                        {ring?.supportedModalities.map(mod => {
                          const isPracticed = selectedAthlete.modalities.includes(mod);
                          return (
                            <div key={mod} className={cn(
                              "flex items-center space-x-3 border-2 border-black p-4 bg-white transition-opacity",
                              !isPracticed && "opacity-30"
                            )}>
                              <Checkbox
                                id={mod}
                                checked={selectedMods.includes(mod)}
                                disabled={!isPracticed}
                                onCheckedChange={(checked) => {
                                  if (checked) setSelectedMods([...selectedMods, mod]);
                                  else setSelectedMods(selectedMods.filter(m => m !== mod));
                                }}
                              />
                              <label htmlFor={mod} className="text-[10px] font-black uppercase italic cursor-pointer flex-1">
                                {mod.replace('_', ' ')} {!isPracticed && "(NÃO PRATICA)"}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  className="w-full h-14 font-black uppercase italic rounded-none"
                  disabled={!selectedAthlete || selectedMods.length === 0 || addAthleteMutation.isPending}
                  onClick={() => addAthleteMutation.mutate({ athleteId: selectedAthlete!.id, selectedModalities: selectedMods })}
                >
                  Registrar Participação
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 italic">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" /> Arena Ativa
              </h3>
              {matches?.filter(m => m.status === 'Active').length === 0 && (
                <div className="p-10 border-2 border-dashed border-black/10 text-center">
                  <p className="text-[10px] font-black uppercase opacity-40">Nenhum combate ativo</p>
                </div>
              )}
              {matches?.filter(m => m.status === 'Active').map(match => (
                <Link key={match.id} to={`/match/${match.id}`}>
                  <Card className="border-[6px] border-black rounded-none shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] group">
                    <CardContent className="p-10 space-y-10">
                      <div className="flex justify-center">
                        <Badge className="bg-black text-white px-4 py-1 font-black uppercase italic text-[10px]">
                          {match.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-10">
                        <div className="text-center flex-1">
                          <p className="text-3xl font-black uppercase italic tracking-tighter text-blue-600 leading-none">
                            {athletes?.find(a => a.id === match.athleteBlueId)?.name}
                          </p>
                        </div>
                        {match.athleteRedId ? (
                          <>
                            <p className="text-4xl font-black italic opacity-20">VS</p>
                            <div className="text-center flex-1">
                              <p className="text-3xl font-black uppercase italic tracking-tighter text-red-600 leading-none">
                                {athletes?.find(a => a.id === match.athleteRedId)?.name}
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="text-center flex-1">
                            <p className="text-sm font-black italic opacity-40">APRESENTAÇÃO SOLO</p>
                          </div>
                        )}
                      </div>
                      <Button className="w-full h-16 text-xl font-black italic rounded-none shadow-xl">RETOMAR</Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </section>
            <section className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground italic">Fila de Chamada</h3>
              <div className="grid gap-3">
                {matches?.filter(m => m.status === 'Pending').map((match, idx) => (
                  <Card key={match.id} className="border-2 border-black rounded-none hover:bg-muted/30 transition-colors">
                    <CardContent className="p-0 flex items-center h-20">
                      <div className="w-16 h-full bg-black text-white flex items-center justify-center text-lg font-black italic shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1 px-6 flex justify-between items-center">
                        <div>
                          <p className="text-[8px] font-black uppercase text-primary/60 mb-0.5 italic">{match.type.replace('_', ' ')}</p>
                          <p className="font-black uppercase italic text-xs truncate max-w-[180px]">
                            {athletes?.find(a => a.id === match.athleteBlueId)?.name}
                            {match.athleteRedId && ` vs ${athletes?.find(a => a.id === match.athleteRedId)?.name}`}
                            {!match.athleteRedId && " (Solo)"}
                          </p>
                        </div>
                        <Link to={`/match/${match.id}`}><ChevronRight className="w-6 h-6 opacity-20 hover:opacity-100" /></Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
          <aside className="space-y-8">
            <section className="p-8 border-2 border-black space-y-8 bg-muted/20 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground italic">Definir Participações ({ring?.participants?.length || 0})</h3>
              <div className="space-y-3">
                {ring?.participants?.map(p => {
                  const athlete = athletes?.find(a => a.id === p.athleteId);
                  return (
                    <div key={p.athleteId} className="p-4 bg-white border-2 border-black flex justify-between items-center">
                      <div>
                        <p className="font-black uppercase italic text-[11px] leading-tight">{athlete?.name}</p>
                        <p className="text-[8px] font-bold uppercase opacity-40 mt-0.5">{athlete?.club}</p>
                      </div>
                      <div className="flex gap-1">
                        {p.selectedModalities.map(mod => {
                          const Icon = modIcons[mod];
                          return <Icon key={mod} className="w-3 h-3 text-primary" />;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pt-6 border-t-2 border-black space-y-4">
                <Button
                  className="w-full h-14 font-black uppercase italic rounded-none gap-3 bg-black text-white hover:bg-black/80"
                  onClick={() => drawMutation.mutate()}
                  disabled={drawMutation.isPending || (matches?.length || 0) > 0 || (ring?.participants?.length || 0) === 0}
                >
                  <Shuffle className="w-5 h-5" />
                  {(matches?.length || 0) > 0 ? 'LISTA CONCLUÍDA' : 'GERAR FILA HYO'}
                </Button>
                <div className="flex items-start gap-3 bg-white p-3 border-2 border-black">
                   <Info className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
                   <p className="text-[8px] font-black uppercase italic leading-normal opacity-60">
                     O sorteio organiza as chaves respeitando a ordem: Fórmulas → Armas → Sparring → Combat.
                   </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}