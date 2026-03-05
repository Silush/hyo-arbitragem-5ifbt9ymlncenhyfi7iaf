import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Calendar, MapPin, Star, Trophy, Info, Loader2, Map, Award, Scale } from 'lucide-react';
import { api } from '@/lib/api-client';
import { Event } from '@shared/types';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
export function CircuitPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => api<Event[]>('/api/events')
  });
  const desempateRules = [
    {
      title: "1. Participações em Nacionais",
      content: "Em caso de igualdade de pontos, o primeiro critério de desempate é a maior quantidade de participações em etapas de peso Nacional na temporada atual."
    },
    {
      title: "2. Disputa Direta",
      content: "Persistindo o empate, será realizada uma disputa direta no evento de encerramento. Para Fórmula (Poomsae): uma nova apresentação obrigatória. Para Combate (Sparring): um round extra de Ponto de Ouro."
    }
  ];
  return (
    <AppLayout container title="Circuito Brasileiro 2026" showBack>
      <div className="space-y-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-black uppercase tracking-tight italic text-foreground">Temporada Oficial 2026</h2>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest leading-relaxed">
            O caminho para a elite do Taekwondo HYO. Pontuação acumulada para o TOP FOUR nacional.
          </p>
        </div>
        {/* Sedes e Eventos Destaque */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-primary" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Sedes e Eventos Oficiais</h3>
          </div>
          <div className="grid gap-4">
            <div className="hyo-gradient-border">
              <div className="bg-card rounded-[inherit] p-5">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-black uppercase text-sm italic">Brasília Experience</h4>
                  <Badge className="bg-blue-600 text-[8px] font-black uppercase">Peso Nacional</Badge>
                </div>
                <p className="text-[11px] font-medium text-muted-foreground leading-relaxed">
                  Evento oficial de abertura da temporada no Planalto Central. Sede fixa para seletivas de alta performance.
                </p>
              </div>
            </div>
            <div className="hyo-gradient-border">
              <div className="bg-card rounded-[inherit] p-5">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-black uppercase text-sm italic">Balneário Camboriú Challenge</h4>
                  <Badge className="bg-amber-500 text-black text-[8px] font-black uppercase">Grand Slam</Badge>
                </div>
                <p className="text-[11px] font-medium text-muted-foreground leading-relaxed">
                  O maior desafio do ano no Sul do Brasil. Etapa crucial para definição dos cabeças de chave do Top Four.
                </p>
              </div>
            </div>
            <Card className="bg-muted/30 border-2 border-dashed">
              <CardContent className="p-4 flex items-center gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-[10px] font-bold uppercase leading-tight opacity-70">
                  Importante: Eventos estaduais enviam planilhas de faixas pretas para validação direta no ranking nacional.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* Classificação TOP FOUR */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Classificação TOP FOUR</h3>
          </div>
          <Card className="border-2 border-amber-500/30 bg-amber-500/5">
            <CardContent className="p-6">
              <p className="text-sm font-black uppercase italic leading-relaxed mb-4">
                "O ACESSO ÀS FINAIS DO HYO CHALLENGE É GARANTIDO AO ATLETA QUE ACUMULAR O MÍNIMO DE 4 PONTOS NO CIRCUITO NACIONAL."
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background p-3 rounded-lg border text-center">
                  <div className="text-xl font-black">1.0x</div>
                  <div className="text-[8px] font-black uppercase text-muted-foreground">Peso Estadual</div>
                </div>
                <div className="bg-background p-3 rounded-lg border text-center border-amber-500/50">
                  <div className="text-xl font-black text-amber-600">3.0x</div>
                  <div className="text-[8px] font-black uppercase text-muted-foreground">Peso Nacional</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        {/* Normativas Técnicas */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-slate-700" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Regras de Desempate e Premiação</h3>
          </div>
          <Accordion type="single" collapsible className="space-y-2">
            {desempateRules.map((rule, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-2 rounded-xl px-4 bg-card">
                <AccordionTrigger className="text-[11px] font-black uppercase hover:no-underline">{rule.title}</AccordionTrigger>
                <AccordionContent className="text-xs font-medium leading-relaxed opacity-80 pb-4">
                  {rule.content}
                </AccordionContent>
              </AccordionItem>
            ))}
            <AccordionItem value="premiacao" className="border-2 rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-[11px] font-black uppercase hover:no-underline">Sistema de Premiação</AccordionTrigger>
              <AccordionContent className="space-y-3 pb-4">
                <p className="text-xs font-medium leading-relaxed opacity-80">
                  As etapas do circuito conferem troféus exclusivos para o Top 3 (Ouro, Prata, Bronze) de cada categoria.
                </p>
                <div className="bg-slate-900 text-white p-3 rounded-lg flex items-center gap-3">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0" />
                  <p className="text-[10px] font-black uppercase tracking-widest leading-tight">
                    Campeão da Temporada: Outorga do PIN Nacional HYO para o Dobok.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
        {/* Calendário Visual */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Calendário de Etapas</h3>
          </div>
          {isLoading ? (
            <div className="py-10 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>
          ) : (
            <div className="grid gap-3">
              {events?.map((stage) => (
                <Card key={stage?.id || `event-${Math.random()}`} className={stage?.isNational ? "border-amber-500 shadow-md" : "border-muted"}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-black uppercase text-muted-foreground">
                          {stage?.date ? new Date(stage.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : '??/??'}
                        </span>
                        {stage?.isNational && <Badge className="h-4 px-1.5 text-[7px] font-black bg-amber-500 text-black">NACIONAL</Badge>}
                      </div>
                      <h4 className="text-sm font-black uppercase italic">{stage?.name || 'Evento'}</h4>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedEvent(stage)} className="rounded-full">
                      <Info className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-md w-[95vw] rounded-2xl p-0 overflow-hidden border-none">
            {selectedEvent && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl font-black uppercase italic p-4 pb-2 text-center">Detalhes da Etapa Selecionada</DialogTitle>
                  <DialogDescription className="text-sm font-medium text-muted-foreground px-4 pb-6 text-center">Informações técnicas e regulamento da etapa do Circuito Brasileiro HYO 2026.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col">
                  <div className="h-32 bg-slate-900 flex items-center justify-center relative">
                     <Trophy className="w-12 h-12 text-amber-500/20 absolute" />
                     <div className="text-center z-10 p-4">
                       <h2 className="text-xl font-black uppercase text-white leading-none">{selectedEvent?.name || 'Evento'}</h2>
                       <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest mt-2">{selectedEvent?.location || 'Local'}</p>
                     </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="bg-muted/50 p-4 rounded-xl space-y-3">
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Informações Técnicas</p>
                      <div className="space-y-2 text-xs font-bold">
                        <div className="flex justify-between"><span>PESO:</span> <span className="uppercase text-primary">{selectedEvent?.isNational ? '3.0 (NACIONAL)' : '1.0 (ESTADUAL)'}</span></div>
                        <div className="flex justify-between"><span>FORMATO:</span> <span className="uppercase">CHAVE WT/HYO</span></div>
                      </div>
                    </div>
                    <Button className="w-full h-12 font-black uppercase shadow-lg" onClick={() => toast.info('Inscrições via Secretaria')}>
                      Ver Circular do Evento
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}