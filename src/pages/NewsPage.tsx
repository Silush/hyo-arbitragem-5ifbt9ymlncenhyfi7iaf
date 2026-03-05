import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Newspaper, Calendar, ArrowRight } from 'lucide-react';
export function NewsPage() {
  const newsList = [
    {
      id: 1,
      title: "Resultados Oficiais Brasília Experience 2026",
      summary: "Confira a lista completa de medalhistas da primeira etapa nacional do ano. Destaque para a equipe Hyo Team que liderou o quadro.",
      date: "15 Mai, 2026",
      cat: "Resultado"
    },
    {
      id: 2,
      title: "Novas Regras de Arbitragem para Combat Weapon",
      summary: "A diretoria técnica da HYO publicou novas diretrizes para o uso de armas em combate, visando maior segurança e dinamismo.",
      date: "10 Mai, 2026",
      cat: "Técnico"
    },
    {
      id: 3,
      title: "Inscrições Abertas: Porto Alegre Challenge",
      summary: "Garanta sua vaga na etapa sulista do Circuito Brasileiro. Inscrições com desconto até o final deste mês via Secretaria.",
      date: "05 Mai, 2026",
      cat: "Evento"
    },
    {
      id: 4,
      title: "Seminário de Arbitragem: Rio de Janeiro",
      summary: "Convocação obrigatória para todos os árbitros federados do estado do RJ para atualização de protocolos operacionais.",
      date: "01 Mai, 2026",
      cat: "Comunicado"
    }
  ];
  return (
    <AppLayout container title="Feed de Notícias" showBack>
      <div className="space-y-8">
        <div className="text-center space-y-2 border-b-2 border-black pb-8">
          <Newspaper className="w-10 h-10 mx-auto text-primary" />
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">NOTÍCIAS HYO</h2>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Comunicados e Resultados Oficiais</p>
        </div>
        <div className="grid gap-6">
          {newsList.map((news) => (
            <Card key={news.id} className="border-2 border-black rounded-none shadow-md hover:shadow-xl transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-primary text-white font-black uppercase text-[9px] rounded-none px-3">
                    {news.cat}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span className="text-[9px] font-black uppercase">{news.date}</span>
                  </div>
                </div>
                <h3 className="text-xl font-black uppercase italic leading-tight group-hover:text-blue-600 transition-colors mb-3">
                  {news.title}
                </h3>
                <p className="text-xs font-medium text-muted-foreground leading-relaxed mb-6">
                  {news.summary}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                  Ler Conteúdo Completo <ArrowRight className="w-3 h-3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}