import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Shirt, Shield, Swords, CheckCircle, Info, Ban, Sparkles } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { cn } from '@/lib/utils';
export function UniformsPage() {
  const uniformRules = [
    "Dobok oficial HYO com logo da associação no peito e logo da escola no braço.",
    "Faixa correspondente à graduação devidamente amarrada com pontas iguais.",
    "Obrigatório estar com o uniforme sempre limpo e passado.",
    "Calçados de artes marciais (Branco ou Preto) são permitidos apenas fora da área de combate.",
    "É proibido o uso de camisetas por baixo do Dobok (exceto para o público feminino, se for branca)."
  ];
  const protectionItems = [
    { title: "Capacete", desc: "Com máscara transparente (grade) homologada pela HYO para categorias infantis." },
    { title: "Colete (Hogu)", desc: "Com zíper preto no fechamento traseiro, sem logos aparentes de outras marcas." },
    { title: "Luvas", desc: "Estilo MMA com proteção acolchoada para o polegar. Cor: Branca ou Preto." },
    { title: "Bota HYO", desc: "Protetor de pé específico. Nota: Não são permitidas botas de Karatê ou Muay Thai." },
    { title: "Bocal", desc: "Obrigatório o uso de bocal de silicone (Transparente ou Branco)." },
    { title: "Coquilha", desc: "Obrigatória para atletas masculinos (uso por baixo da calça)." }
  ];
  return (
    <AppLayout container title="Uniformização e Proteção" showBack>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black uppercase tracking-tight italic text-blue-700">Padrão Oficial HYO</h2>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Integridade • Disciplina • Segurança</p>
        </div>
        <Tabs defaultValue="uniforme" className="w-full space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-muted p-1 rounded-xl">
            <TabsTrigger value="uniforme" className="font-black uppercase text-[8px] sm:text-[9px]"><Shirt className="w-3 h-3 mr-1.5" /> Dobok</TabsTrigger>
            <TabsTrigger value="protecao" className="font-black uppercase text-[8px] sm:text-[9px]"><Shield className="w-3 h-3 mr-1.5" /> Proteções</TabsTrigger>
            <TabsTrigger value="armas" className="font-black uppercase text-[8px] sm:text-[9px]"><Swords className="w-3 h-3 mr-1.5" /> Armas</TabsTrigger>
          </TabsList>
          <TabsContent value="uniforme" className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <Card className="border-2 border-primary/20 shadow-sm overflow-hidden">
              <div className="bg-primary text-white p-4 flex items-center gap-3">
                <Shirt className="w-5 h-5" />
                <h3 className="font-black uppercase text-xs italic">Diretrizes de Vestimenta</h3>
              </div>
              <CardContent className="p-5">
                <ul className="space-y-4">
                  {uniformRules.map((rule, idx) => (
                    <li key={idx} className="flex gap-4 text-xs font-medium leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <div className="bg-muted/50 p-4 rounded-xl flex items-center gap-3">
               <Info className="w-5 h-5 text-blue-600 shrink-0" />
               <p className="text-[10px] font-bold uppercase opacity-60">O descumprimento dos padrões de uniformização impede a participação no evento.</p>
            </div>
          </TabsContent>
          <TabsContent value="protecao" className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="grid gap-3">
              {protectionItems.map((item, idx) => (
                <Card key={idx} className="border-2 shadow-sm">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-xs italic">{item.title}</h4>
                      <p className="text-[10px] font-medium text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="bg-red-600/5 border-2 border-red-600/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Ban className="w-5 h-5 text-red-600 shrink-0" />
                <p className="text-[10px] font-black uppercase text-red-600">Proibido: Botas de Karatê, Muay Thai ou calçados não homologados na arena.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="armas" className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <Card className="border-2 shadow-sm">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-3 border-b pb-4">
                  <Swords className="w-6 h-6 text-slate-900" />
                  <h3 className="font-black uppercase text-sm italic">Especificação de Armas</h3>
                </div>
                <div className="space-y-4 text-xs font-medium leading-relaxed">
                  <p className="flex gap-2">
                    <span className="font-black text-primary">MATERIAIS:</span> 
                    Homologados SJB ou BMG (borracha, polímero ou espuma densa).
                  </p>
                  <p className="flex gap-2">
                    <span className="font-black text-primary">IDENTIDADE:</span> 
                    Obrigatório conter a logo oficial da escola do atleta.
                  </p>
                  <p className="flex gap-2">
                    <span className="font-black text-primary">ESTADO:</span> 
                    As armas devem estar em perfeitas condições, sem rachaduras ou fita adesiva aparente.
                  </p>
                </div>
              </CardContent>
            </Card>
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-center gap-3">
               <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
               <p className="text-[10px] font-black uppercase text-amber-700">Gum Do e Bong Sul exigem inspeção técnica imediata antes da entrada no tatame.</p>
            </div>
          </TabsContent>
        </Tabs>
        <div className="pt-10 flex flex-col items-center gap-6">
          <BrandLogo size="md" />
          <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.4em] opacity-40">
            HYO Performance & Operations © 2024
          </p>
        </div>
      </div>
    </AppLayout>
  );
}