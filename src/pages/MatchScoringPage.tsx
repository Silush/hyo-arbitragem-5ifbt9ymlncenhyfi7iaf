import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from 'react-use';
import { api } from '@/lib/api-client';
import { Match, Athlete, WinCondition } from '@shared/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, Loader2, Minus, Info, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
export function MatchScoringPage() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: match } = useQuery({
    queryKey: ['match', matchId],
    queryFn: () => api<Match>(`/api/matches/${matchId}`),
    enabled: !!matchId
  });
  const { data: athletes } = useQuery({
    queryKey: ['athletes'],
    queryFn: () => api<Athlete[]>('/api/athletes')
  });
  const [score, setScore] = useState({ blue: 0, red: 0, bluePenalties: 0, redPenalties: 0 });
  const [poomsaeJudges, setPoomsaeJudges] = useState({
    blue: [0, 0, 0],
    red: [0, 0, 0]
  });
  const [seconds, setSeconds] = useState(120);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout>();
  const [isSyncing, setIsSyncing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showFinishDialog, setShowFinishDialog] = useState(false);
  const isIndividual = match && !match.athleteRedId;
  const isPoomsae = match?.type === 'FORMAS_TRADICIONAIS' || match?.type === 'ARMAS';
  const isTied = !isIndividual && !isPoomsae && score.blue === score.red && score.blue > 0;
  useEffect(() => {
    if (match && !isInitialized) {
      setScore(match.score || { blue: 0, red: 0, bluePenalties: 0, redPenalties: 0 });
      setIsInitialized(true);
      if (isPoomsae) setSeconds(0);
    }
  }, [match, isInitialized, isPoomsae]);
  useEffect(() => {
    if (isPoomsae) {
      const calcAvg = (notes: number[]) => {
        const filledNotes = notes.filter(n => n > 0);
        if (filledNotes.length === 0) return 0;
        const sum = filledNotes.reduce((a, b) => a + b, 0);
        return parseFloat((sum / filledNotes.length).toFixed(2));
      };
      setScore(prev => ({
        ...prev,
        blue: calcAvg(poomsaeJudges.blue),
        red: calcAvg(poomsaeJudges.red)
      }));
    }
  }, [poomsaeJudges, isPoomsae]);
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isActive]);
  const updateScoreMutation = useMutation({
    mutationFn: (newScore: Match['score']) =>
      api(`/api/matches/${matchId}/score`, { method: 'POST', body: JSON.stringify(newScore) }),
    onSuccess: () => {
      setIsSyncing(false);
      queryClient.invalidateQueries({ queryKey: ['match', matchId] });
    },
    onError: () => setIsSyncing(false)
  });
  const finishMatchMutation = useMutation({
    mutationFn: (data: { winnerId: string; winCondition: WinCondition }) =>
      api(`/api/matches/${matchId}/finish`, { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => {
      toast.success("Resultado registrado oficialmente.");
      navigate(`/ring/${match?.ringId}`);
    }
  });
  useDebounce(() => {
    if (isInitialized) {
      setIsSyncing(true);
      updateScoreMutation.mutate(score);
    }
  }, 1000, [score]);
  const changeScore = useCallback((side: 'blue' | 'red', amount: number) => {
    setScore(prev => ({ ...prev, [side]: Math.max(0, prev[side] + amount) }));
  }, []);
  const addGamJeom = useCallback((side: 'blue' | 'red') => {
    setScore(prev => {
      const penaltyKey = side === 'blue' ? 'bluePenalties' : 'redPenalties';
      const otherSide = side === 'blue' ? 'red' : 'blue';
      return { ...prev, [penaltyKey]: prev[penaltyKey] + 1, [otherSide]: prev[otherSide] + 1 };
    });
  }, []);
  const handleFinish = () => {
    if (!match) return;
    const winnerId = isIndividual ? match.athleteBlueId : (score.blue >= score.red ? match.athleteBlueId : match.athleteRedId);
    finishMatchMutation.mutate({ winnerId, winCondition: isPoomsae ? "Superiority" : "Points" });
  };
  const getAthlete = (id: string) => athletes?.find((a) => a.id === id);
  if (!match) return null;
  return (
    <div className="fixed inset-0 bg-background flex flex-col overflow-hidden select-none font-sans">
      <header className="h-16 flex items-center justify-between px-6 border-b-2 border-black z-50 shrink-0 bg-background">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-12 w-12 border-2 border-black rounded-none">
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">
            {isIndividual ? 'Apresentação Técnica' : 'Arena de Combate'}
          </span>
          {!isPoomsae && (
            <div className={cn(
              "text-3xl font-black tabular-nums tracking-tighter transition-all flex items-center gap-2",
              isActive && "animate-pulse text-red-600",
              isTied && seconds === 0 && "text-amber-500"
            )}>
              {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}
              {isTied && seconds === 0 && <Zap className="w-5 h-5 fill-amber-500 animate-bounce" />}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {!isPoomsae && (
            <Button
              size="sm"
              variant={isActive ? "destructive" : "default"}
              className="font-black px-8 h-10 rounded-none border-2 border-black uppercase italic text-xs"
              onClick={() => setIsActive(!isActive)}
            >
              {isActive ? 'PAUSE' : 'START'}
            </Button>
          )}
          {isSyncing && <Loader2 className="w-5 h-5 animate-spin opacity-40" />}
        </div>
      </header>
      <div className="flex-1 flex flex-col md:flex-row z-10">
        {!isPoomsae ? (
          <>
            <div className="flex-1 bg-blue-700 text-white flex flex-col">
              <div className="p-4 bg-black/10 flex justify-between items-center">
                <span className="font-black text-xs uppercase italic tracking-wider truncate">{getAthlete(match.athleteBlueId)?.name}</span>
                <span className="text-[8px] font-black uppercase bg-white/20 px-2 py-1">AZUL</span>
              </div>
              <div className="flex-1 flex items-center justify-center text-[12rem] sm:text-[15rem] font-black leading-none tabular-nums">{score.blue}</div>
              <div className="grid grid-cols-4 h-28 bg-black/30">
                <button onClick={() => changeScore('blue', 1)} className="font-black border-r-2 border-white/10 text-xl active:bg-white/20">+1</button>
                <button onClick={() => changeScore('blue', 2)} className="font-black border-r-2 border-white/10 text-xl active:bg-white/20">+2</button>
                <button onClick={() => changeScore('blue', 3)} className="font-black border-r-2 border-white/10 text-xl active:bg-white/20">+3</button>
                <div className="flex flex-col">
                  <button onClick={() => addGamJeom('blue')} className="flex-1 bg-amber-500 text-black font-black text-[10px] uppercase active:bg-amber-400">GAM</button>
                  <button onClick={() => changeScore('blue', -1)} className="flex-1 bg-black flex items-center justify-center active:bg-white/10"><Minus className="w-5 h-5" /></button>
                </div>
              </div>
            </div>
            {!isIndividual && (
              <div className="flex-1 bg-red-700 text-white flex flex-col">
                <div className="p-4 bg-black/10 flex justify-between items-center">
                  <span className="text-[8px] font-black uppercase bg-white/20 px-2 py-1">VERMELHO</span>
                  <span className="font-black text-xs uppercase italic tracking-wider truncate">{getAthlete(match.athleteRedId)?.name}</span>
                </div>
                <div className="flex-1 flex items-center justify-center text-[12rem] sm:text-[15rem] font-black leading-none tabular-nums">{score.red}</div>
                <div className="grid grid-cols-4 h-28 bg-black/30">
                  <button onClick={() => changeScore('red', 1)} className="font-black border-r-2 border-white/10 text-xl active:bg-white/20">+1</button>
                  <button onClick={() => changeScore('red', 2)} className="font-black border-r-2 border-white/10 text-xl active:bg-white/20">+2</button>
                  <button onClick={() => changeScore('red', 3)} className="font-black border-r-2 border-white/10 text-xl active:bg-white/20">+3</button>
                  <div className="flex flex-col">
                    <button onClick={() => addGamJeom('red')} className="flex-1 bg-amber-500 text-black font-black text-[10px] uppercase active:bg-amber-400">GAM</button>
                    <button onClick={() => changeScore('red', -1)} className="flex-1 bg-black flex items-center justify-center active:bg-white/10"><Minus className="w-5 h-5" /></button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 p-6 space-y-8 overflow-y-auto bg-muted/20">
            {['blue', ...(isIndividual ? [] : ['red'])].map(side => (
              <Card key={side} className="border-4 border-black rounded-none shadow-xl overflow-hidden">
                <div className={cn("p-4 font-black uppercase italic text-xs text-white", side === 'blue' ? 'bg-blue-600' : 'bg-red-600')}>
                  {getAthlete(side === 'blue' ? match.athleteBlueId : match.athleteRedId)?.name}
                </div>
                <CardContent className="p-8 space-y-8">
                  <div className="flex justify-center">
                    <div className="text-8xl font-black tabular-nums">{score[side as 'blue' | 'red']}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="space-y-2">
                        <label className="text-[9px] font-black uppercase opacity-40 text-center block">Juiz {i+1}</label>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="0.0"
                          className="h-16 text-center text-xl font-black border-2 border-black rounded-none focus:ring-0"
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            const next = { ...poomsaeJudges };
                            next[side as 'blue' | 'red'][i] = val;
                            setPoomsaeJudges(next);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Button className="h-20 w-full font-black text-xl italic uppercase rounded-none border-t-4 border-black bg-black text-white hover:bg-black/90 active:scale-[0.99] transition-all" onClick={() => setShowFinishDialog(true)}>
        VALIDAR SÚMULA FINAL
      </Button>
      <Dialog open={showFinishDialog} onOpenChange={setShowFinishDialog}>
        <DialogContent className="max-w-md rounded-none border-4 border-black">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter">Súmula de Resultado</DialogTitle>
            <DialogDescription className='text-xs font-bold uppercase text-muted-foreground'>Revise os pontos antes de gravar no ranking oficial.</DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-6">
            {isTied && seconds === 0 && (
              <div className="bg-amber-500 p-4 border-2 border-black flex items-center gap-4 text-black">
                <Zap className="w-6 h-6 fill-black" />
                <p className="text-[10px] font-black uppercase leading-tight italic">
                  EMPATE DETECTADO: Round de Ponto de Ouro ou Decisão de Superioridade requerida.
                </p>
              </div>
            )}
            <div className={cn("grid gap-4", isIndividual ? "grid-cols-1" : "grid-cols-2")}>
              <div className="p-6 border-2 border-blue-600 text-center bg-blue-50/50">
                <div className="text-5xl font-black italic">{score.blue}</div>
                <div className="text-[10px] font-black uppercase opacity-60 mt-2">AZUL</div>
              </div>
              {!isIndividual && (
                <div className="p-6 border-2 border-red-600 text-center bg-red-50/50">
                  <div className="text-5xl font-black italic">{score.red}</div>
                  <div className="text-[10px] font-black uppercase opacity-60 mt-2">VERMELHO</div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full h-16 font-black uppercase italic rounded-none border-2 border-black bg-black text-white hover:bg-black/80" onClick={handleFinish} disabled={finishMatchMutation.isPending}>
              CONFIRMAR E FINALIZAR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}