import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Layers, Zap, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
export function CategoriesPage() {
  const roundSections = [
    {
      title: 'Rounds de Faixas Coloridas',
      items: [
        { label: 'Round 0', value: 'Branca / Branca Ponta Amarela', color: 'bg-slate-100 text-slate-900 border-slate-200' },
        { label: 'Round 1', value: 'Amarela / Camuflada / Laranja', color: 'bg-yellow-100 text-yellow-900 border-yellow-200' },
        { label: 'Round 2', value: 'Verde / Roxa / Azul', color: 'bg-emerald-100 text-emerald-900 border-emerald-200' },
        { label: 'Round 3', value: 'Marrom / Vermelha / Vermelha-Preta', color: 'bg-red-100 text-red-900 border-red-200' },
      ]
    }
  ];
  const ageSections = [
    {
      title: 'Divisões de Idade (Anos)',
      items: [
        { label: 'Infantil', value: '07-08 / 09-10 anos' },
        { label: 'Juvenil', value: '11-12 / 13-14 / 15-17 anos' },
        { label: 'Adulto', value: '18 a 29 anos' },
        { label: 'Senior', value: '30-39 / 40-49 / 50-59 / 60+' },
      ]
    }
  ];
  const equipment = [
    'Protetor de Tronco (Hogu)',
    'Protetor de Cabeça',
    'Protetor Bucal (Branco ou Transparente)',
    'Luvas de Taekwondo',
    'Caneleiras e Protetores de Antebraço',
    'Protetor de Pé (Meias Eletrônicas se aplicável)'
  ];
  return (
    <AppLayout container title="Categorias e Modalidades" showBack>
      <div className="space-y-8">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Estrutura Técnica</h3>
          </div>
          {roundSections.map((section) => (
            <div key={section.title} className="space-y-3">
              {section.items.map((item) => (
                <div key={item.label} className="hyo-gradient-border">
                  <div className="bg-background rounded-[calc(var(--radius)-1px)] p-4 flex justify-between items-center">
                    <Badge className={cn("font-black uppercase text-[10px] h-6", item.color)}>
                      {item.label}
                    </Badge>
                    <span className="text-xs font-black text-right uppercase italic">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-red-600" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Divisões de Idade</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {ageSections[0].items.map((item) => (
              <Card key={item.label} className="border-2 shadow-sm">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-1">
                  <span className="text-[9px] font-black uppercase text-muted-foreground">{item.label}</span>
                  <span className="text-xs font-black italic">{item.value}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Equipamentos Obrigatórios</h3>
          </div>
          <Card className="bg-muted/30 border-2 border-dashed">
            <CardContent className="p-4">
              <ul className="grid grid-cols-1 gap-2">
                {equipment.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs font-bold uppercase italic">
                    <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Link to="/uniformes" className="block group">
            <div className="hyo-gradient-border">
              <div className="bg-card rounded-[inherit] p-4 flex items-center justify-between transition-colors group-hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-tight italic">Veja o manual completo de Uniformes e Proteções</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Link>
        </section>
        <div className="bg-slate-900 text-white p-6 rounded-2xl">
          <p className="text-[10px] font-black uppercase mb-3 text-amber-500 tracking-widest">Observação de Segurança</p>
          <p className="text-[11px] leading-relaxed font-medium italic opacity-80">
            Atletas sem os equipamentos obrigatórios serão desclassificados após 2 minutos de chamada caso não regularizem a situação no tatame.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}