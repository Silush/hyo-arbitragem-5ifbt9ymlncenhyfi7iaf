import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { api } from '@/lib/api-client';
import { Ring, AgeCategory, Modality } from '@shared/types';
import { Plus, Users, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function RingsListPage() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState<AgeCategory>('Adulto');
  const [selectedModalities, setSelectedModalities] = useState<Modality[]>([]);
  const { data: rings, isLoading } = useQuery({
    queryKey: ['rings'],
    queryFn: () => api<Ring[]>('/api/rings')
  });
  const createRingMutation = useMutation({
    mutationFn: (data: { ageRange: string, supportedModalities: Modality[] }) =>
      api('/api/rings', { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rings'] });
      toast.success("Arena configurada com sucesso!");
      setIsDialogOpen(false);
      setSelectedModalities([]);
    }
  });
  const MODALITIES: { id: Modality; label: string }[] = [
    { id: 'FORMAS_TRADICIONAIS', label: 'Fórmula Tradicional' },
    { id: 'ARMAS', label: 'Armas' },
    { id: 'SPARRING', label: 'Sparring' },
    { id: 'AVANCADO_PRETAS', label: 'Avançado Pretas' },
    { id: 'COMBATE_ARMADO', label: 'Combat Weapon' },
  ];
  const handleModToggle = (mod: Modality) => {
    setSelectedModalities(prev => 
      prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]
    );
  };
  return (
    <AppLayout title="ARENAS DE COMPETIÇÃO" showBack>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b-2 border-black pb-8">
          <div className="space-y-1">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Event Control</h2>
            <p className="text-[11px] text-muted-foreground font-black uppercase tracking-[0.3em]">Gestão Multi-Modalidade HYO</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="h-14 px-8 rounded-none border-2 border-black font-black uppercase italic flex items-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all">
                <Plus className="w-5 h-5" /> Abrir Arena
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-none border-2 border-black max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black uppercase italic">Configurar Tatame</DialogTitle>
                <DialogDescription className="text-xs font-bold uppercase">Selecione as categorias que esta arena irá gerir.</DialogDescription>
              </DialogHeader>
              <div className="py-6 space-y-8">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-muted-foreground">Faixa Etária Base</span>
                  <Select value={selectedAge} onValueChange={(v) => setSelectedAge(v as AgeCategory)}>
                    <SelectTrigger className="h-14 font-black uppercase rounded-none border-2 border-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      <SelectItem value="Infantil">Infantil (7-10 anos)</SelectItem>
                      <SelectItem value="Juvenil">Juvenil (11-17 anos)</SelectItem>
                      <SelectItem value="Adulto">Adulto (18-29 anos)</SelectItem>
                      <SelectItem value="Senior">Senior (30+ anos)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase text-muted-foreground">Modalidades Permitidas</span>
                  <div className="grid gap-2">
                    {MODALITIES.map((mod) => (
                      <div key={mod.id} className="flex items-center space-x-3 p-3 border-2 border-black hover:bg-muted/50 cursor-pointer" onClick={() => handleModToggle(mod.id)}>
                        <Checkbox checked={selectedModalities.includes(mod.id)} onCheckedChange={() => handleModToggle(mod.id)} />
                        <label className="text-[10px] font-black uppercase italic cursor-pointer">{mod.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="w-full h-14 font-black uppercase italic rounded-none"
                  onClick={() => createRingMutation.mutate({ ageRange: selectedAge, supportedModalities: selectedModalities })}
                  disabled={createRingMutation.isPending || selectedModalities.length === 0}
                >
                  Abrir Tatame
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            [1,2,3].map(i => <div key={i} className="h-64 bg-muted animate-pulse border-2 border-black" />)
          ) : (
            rings?.map((ring) => (
              <Link key={ring.id} to={`/ring/${ring.id}`} className="group">
                <Card className="border-2 border-black rounded-none h-full bg-white hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-[-4px] translate-x-[-4px] hover:translate-y-0 hover:translate-x-0">
                  <CardContent className="p-8 flex flex-col justify-between h-full space-y-8">
                    <div className="flex justify-between items-start">
                      <div className="w-16 h-16 border-2 border-current flex items-center justify-center">
                        <span className="text-3xl font-black italic">{ring.letter}</span>
                      </div>
                      <Badge className="rounded-none font-black uppercase text-[8px] border-2 border-current px-2">
                        {ring.ageRange}
                      </Badge>
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-black uppercase italic tracking-tighter">ARENA {ring.letter}</CardTitle>
                      <div className="flex items-center gap-3 mt-3 text-[10px] font-black uppercase opacity-60">
                        <Users className="w-4 h-4" />
                        <span>{ring.participants?.length || 0} Participantes</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 border-t-2 border-current pt-6">
                      {ring.supportedModalities?.map(m => (
                        <span key={m} className="text-[7px] font-black uppercase bg-muted/20 px-1.5 py-0.5 border border-current">
                          {m.replace('_', ' ')}
                        </span>
                      ))}
                      <div className="ml-auto"><ChevronRight className="w-4 h-4" /></div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}