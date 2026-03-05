import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Scale, Users, Gavel, ClipboardCheck, UserCheck } from 'lucide-react';
export function RulesPage() {
  const manual = [
    {
      id: 'check-in',
      title: 'Procedimentos de Check-in',
      icon: ClipboardCheck,
      rules: [
        'Apresentação obrigatória no local do evento **30 minutos antes** do início de sua categoria.',
        'Conferência rigorosa de **equipamentos de proteção** (homologados pela HYO/WT).',
        'Assinatura da súmula de presença e validação da graduação atual.',
        'Os árbitros devem se apresentar devidamente uniformizados (Dobok oficial ou traje social conforme convocação).'
      ]
    },
    {
      id: 'structure',
      title: 'Estrutura de Arbitragem',
      icon: Users,
      rules: [
        '**3 Juízes Laterais:** Responsáveis pela marcação de pontos técnicos e observação de faltas.',
        '**1 Juiz de Mesa (Cronometrista):** Gestão do tempo, chamada de atletas e registro oficial da súmula.',
        '**1 Coordenador de Ringue:** Autoridade máxima do tatame, responsável por mediar contestações e validar o resultado final.',
        'Decisões de pontuação em Sparring exigem concordância de pelo menos 2 juízes.'
      ]
    },
    {
      id: 'ethics',
      title: 'Conduta Ética e Postura',
      icon: UserCheck,
      rules: [
        '**Imparcialidade Absoluta:** É proibido arbitrar categorias onde haja vínculo familiar ou de equipe direta sem aviso prévio.',
        '**Silêncio Absoluto:** Proibido conversar durante o combate, exceto para comunicações técnicas rápidas.',
        '**Postura Marcial:** O árbitro deve permanecer sentado de forma ereta, mãos sobre os joelhos, mantendo atenção total na área de combate.',
        '**Adornos:** Proibido o uso de relógios, anéis, pulseiras ou colares chamativos durante a arbitragem.'
      ]
    },
    {
      id: 'prohibitions',
      title: 'Orientações e Proibições',
      icon: ShieldCheck,
      rules: [
        '**Uso de Celular:** Estritamente proibido durante o período de atuação no ringue.',
        '**Manifestações:** Proibido comemorar, torcer ou gesticular em favor de qualquer atleta.',
        '**Conversas Paralelas:** Proibido distrair-se com o público ou outros árbitros enquanto a luta estiver ativa.',
        '**Faltas Graves:** O descumprimento destas normas pode acarretar em suspensão imediata da escala do dia.'
      ]
    }
  ];
  return (
    <AppLayout container title="Regras e Condutas dos Árbitros" showBack>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-black uppercase tracking-tight text-red-600 italic">Manual Oficial HYO</h2>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Integridade • Disciplina • Técnica</p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-3">
          {manual.map((group) => (
            <AccordionItem key={group.id} value={group.id} className="border-2 rounded-xl px-4 bg-card shadow-sm">
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-600/10 rounded-lg">
                    <group.icon className="w-5 h-5 text-blue-700" />
                  </div>
                  <span className="font-black text-xs uppercase tracking-tight text-left">{group.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <ul className="space-y-4 pt-2">
                  {group.rules.map((rule, idx) => (
                    <li key={idx} className="flex gap-4 text-xs font-medium leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-2" />
                      <div dangerouslySetInnerHTML={{ __html: rule }} />
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Card className="bg-slate-900 text-white border-none mt-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/10 rounded-full -mr-12 -mt-12 blur-2xl" />
          <CardContent className="p-6 text-center space-y-2 relative z-10">
            <Scale className="w-6 h-6 mx-auto text-amber-500 mb-2" />
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">Nota de Autoridade</p>
            <p className="text-[11px] font-bold leading-relaxed">
              A decisão do Árbitro Responsável é soberana. Em caso de falha técnica no sistema, a súmula física manual prevalecerá.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}