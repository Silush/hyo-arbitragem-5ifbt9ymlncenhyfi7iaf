import React from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Layers, ShieldCheck, Zap, GraduationCap, Settings, Newspaper, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
export function DashboardPage() {
  const newsItems = [
    { title: "BC Challenge: Inscrições Abertas", date: "Ontem", cat: "Evento" },
    { title: "Novas Regras Combat Weapon 2026", date: "2 dias", cat: "Técnico" },
    { title: "Hyo Brasília: Resultados Finais", date: "5 dias", cat: "Resultado" }
  ];
  const menuItems = [
    {
      title: 'Área de Competição',
      icon: Zap,
      path: '/rings',
      accent: 'text-blue-600',
      desc: 'Gestão de Arenas: Fórmula, Armas e Combates'
    },
    { title: 'Circuito 2026', icon: Layers, path: '/circuito', accent: 'text-primary', desc: 'Etapas e Sedes' },
    { title: 'Top Four Ranking', icon: Trophy, path: '/ranking', accent: 'text-amber-500', desc: 'Líderes Nacionais' },
    { title: 'Área do Aluno', icon: GraduationCap, path: '/area-aluno', accent: 'text-orange-600', desc: 'Performance Pessoal' },
    { title: 'Uniformização', icon: ShieldCheck, path: '/uniformes', accent: 'text-primary', desc: 'Padrões HYO' },
    { title: 'Configurações', icon: Settings, path: '/config', accent: 'text-primary', desc: 'Gestão de Dados' },
  ];
  return (
    <AppLayout container title="HUB OPERACIONAL">
      <div className="space-y-10">
        <div className="space-y-4 text-center">
          <div className="inline-block px-4 py-1 border-2 border-black">
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">Temporada 2026</span>
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic">Bem-vindo</h2>
        </div>
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Newspaper className="w-4 h-4" /> Notícias HYO
            </h3>
            <Link to="/noticias" className="text-[10px] font-black uppercase text-blue-600 hover:underline">Ver Todas</Link>
          </div>
          <div className="grid gap-3">
            {newsItems.map((news, idx) => (
              <Link key={idx} to="/noticias" className="group">
                <Card className="border-2 border-black rounded-none hover:bg-black hover:text-white transition-all">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[8px] font-black uppercase bg-red-600 text-white px-1.5 py-0.5">{news.cat}</span>
                        <span className="text-[8px] font-bold opacity-50 uppercase">{news.date}</span>
                      </div>
                      <h4 className="text-xs font-black uppercase italic leading-tight">{news.title}</h4>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-20 group-hover:opacity-100" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
        <div className="grid grid-cols-1 gap-3">
          {menuItems.map((item, idx) => (
            <Link key={item.path} to={item.path}>
              <Card className={cn(
                "border-2 border-black transition-all rounded-none",
                idx === 0 ? "bg-black text-white" : "bg-white hover:bg-black hover:text-white"
              )}>
                <CardContent className="p-6 flex items-center gap-6">
                  <item.icon className={cn("w-8 h-8", idx === 0 ? "text-blue-400" : item.accent)} />
                  <div>
                    <h3 className="font-black text-lg uppercase italic leading-none">{item.title}</h3>
                    <p className="text-[9px] font-bold uppercase opacity-60 mt-1">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}