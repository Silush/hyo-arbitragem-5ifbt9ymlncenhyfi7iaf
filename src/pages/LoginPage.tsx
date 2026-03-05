import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, ClipboardList, ShieldCheck, GraduationCap } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BrandLogo } from '@/components/BrandLogo';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
export function LoginPage() {
  const navigate = useNavigate();
  const [isSeeding, setIsSeeding] = React.useState(false);
  useEffect(() => {
    const seedData = async () => {
      try {
        setIsSeeding(true);
        await api('/api/seed');
      } catch (err) {
        /* Silently handle seed API failures without warnings */
      } finally {
        setIsSeeding(false);
      }
    };
    seedData();
  }, []);
  const personas = [
    { id: 'referee', title: 'ÁRBITRO', icon: Trophy, desc: 'Gestão de arena e pontos.' },
    { id: 'table', title: 'MESA TÉCNICA', icon: ClipboardList, desc: 'Chamada e controle.' },
    { id: 'coordinator', title: 'MESTRE', icon: ShieldCheck, desc: 'Supervisão do evento.' },
    { id: 'student', title: 'ATLETA', icon: GraduationCap, desc: 'Ranking e suporte.' },
  ];
  const handleSelect = (id: string) => {
    localStorage.setItem('user_role', id);
    if (id === 'student') localStorage.setItem('athlete_id', 'a1');
    toast.success(`MODO ${id.toUpperCase()} ATIVADO`);
    navigate('/dashboard');
  };
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden selection:bg-black selection:text-white">
      <div className="absolute top-4 right-4 flex gap-2">
        <ThemeToggle className="relative" />
      </div>
      <div className="max-w-sm w-full space-y-12 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <BrandLogo size="lg" />
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">ARBITRAGEM</h1>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">
              {isSeeding ? "Sincronizando sistemas..." : "Performance & Control System"}
            </p>
          </div>
        </div>
        <div className="grid gap-3">
          {personas.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card
                className="cursor-pointer border-2 border-black dark:border-white rounded-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all active:scale-[0.98] group"
                onClick={() => handleSelect(p.id)}
              >
                <CardHeader className="flex flex-row items-center gap-6 py-6 px-6">
                  <div className="p-3 border-2 border-current group-hover:border-white dark:group-hover:border-black transition-colors">
                    {React.createElement(p.icon, { className: "w-6 h-6" })}
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-black uppercase italic leading-none">{p.title}</CardTitle>
                    <CardDescription className="text-[9px] font-bold uppercase group-hover:text-white/60 dark:group-hover:text-black/60">{p.desc}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center pt-12">
          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] opacity-40">
            HYO OPERATIONS © 2024
          </p>
        </div>
      </div>
    </div>
  );
}