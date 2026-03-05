import React, { useState, useRef } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, FileSpreadsheet, CheckCircle2, Loader2, AlertCircle, Info, Trash2 } from 'lucide-react';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
export function ConfigPage() {
  const [importing, setImporting] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ type: 'athletes' | 'events', data: any[] } | null>(null);
  const [rawCsv, setRawCsv] = useState<string>('');
  const [uploadType, setUploadType] = useState<'athletes' | 'events' | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const triggerFileInput = (type: 'athletes' | 'events') => {
    setUploadType(type);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !uploadType) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setRawCsv(content);
      const lines = content.split('\n').filter(l => l.trim());
      if (lines.length < 1) return;
      const headers = lines[0].split(',').map(h => h.trim());
      const rows = lines.slice(1, 6).map(line => {
        const cols = line.split(',').map(v => v.trim());
        const obj: any = {};
        headers.forEach((h, i) => obj[h] = cols[i]);
        return obj;
      });
      setPreview({ type: uploadType, data: rows });
    };
    reader.readAsText(file);
  };
  const confirmImport = async () => {
    if (!preview || !rawCsv) return;
    setImporting(preview.type);
    try {
      await api(`/api/import-csv/${preview.type}`, { method: 'POST', body: rawCsv });
      toast.success(`Importação concluída!`);
      setPreview(null);
    } catch (err) {
      toast.error("Falha na importação.");
    } finally {
      setImporting(null);
    }
  };
  const handleResetSystem = async () => {
    setIsResetting(true);
    try {
      await api('/api/reset-data', { method: 'POST' });
      toast.success("Sistema resetado com sucesso.");
      window.location.reload();
    } catch (err) {
      toast.error("Erro ao resetar banco de dados.");
    } finally {
      setIsResetting(false);
    }
  };
  const downloadTemplate = (type: 'athletes' | 'events') => {
    const csv = type === 'athletes'
      ? `nome,clube,faixa,idade,modalidades,pontos\nJoao Silva,Hyo Team,Black,24,SPARRING;ARMAS,120`
      : `nome,data,local,nacional\nCopa Hyo,2026-05-15,Brasilia,true`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `template_${type}.csv`;
    a.click();
  };
  return (
    <AppLayout container title="Gestão de Dados" showBack>
      <div className="space-y-8">
        <section className="bg-slate-900 p-6 text-white space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">1. Baixar Modelos (Templates)</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={() => downloadTemplate('athletes')} variant="outline" className="h-14 font-black bg-white text-black border-none rounded-none text-[10px] uppercase italic">TEMPLATE ATLETAS</Button>
            <Button onClick={() => downloadTemplate('events')} variant="outline" className="h-14 font-black bg-white text-black border-none rounded-none text-[10px] uppercase italic">TEMPLATE EVENTOS</Button>
          </div>
          <div className="flex items-start gap-2 bg-white/10 p-4 border-l-4 border-amber-500">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase text-amber-500">Formato Obrigatório</p>
              <p className="text-[9px] font-bold uppercase leading-relaxed opacity-90">
                O campo <span className="underline italic">"modalidades"</span> deve usar <span className="text-amber-500 font-black">PONTO E VÍRGULA (;)</span> como separador. 
                Exemplo correto: <span className="bg-white/10 px-1">SPARRING;ARMAS</span>
              </p>
            </div>
          </div>
        </section>
        <section className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest opacity-60">2. Realizar Upload</h3>
          <input type="file" ref={fileInputRef} className="hidden" accept=".csv" onChange={handleFileSelect} />
          <div className="grid grid-cols-1 gap-4">
            <Card onClick={() => triggerFileInput('athletes')} className="border-2 border-dashed hover:border-black cursor-pointer transition-all rounded-none p-6 text-center">
              <Upload className="mx-auto w-8 h-8 mb-2 opacity-20" />
              <div className="font-black uppercase text-xs italic">Importar Planilha Atletas</div>
            </Card>
            <Card onClick={() => triggerFileInput('events')} className="border-2 border-dashed hover:border-black cursor-pointer transition-all rounded-none p-6 text-center">
              <Upload className="mx-auto w-8 h-8 mb-2 opacity-20" />
              <div className="font-black uppercase text-xs italic">Importar Planilha Eventos</div>
            </Card>
          </div>
        </section>
        {preview && (
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Preview ({preview.type})</h3>
            <div className="border-2 border-black overflow-hidden bg-background">
              <Table>
                <TableHeader><TableRow className="bg-muted"><TableHead className="font-black text-[10px] uppercase">Preview Data</TableHead></TableRow></TableHeader>
                <TableBody>
                  {preview.data.map((row, i) => (
                    <TableRow key={i}><TableCell className="text-[10px] font-mono">{JSON.stringify(row).slice(0, 100)}...</TableCell></TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Button className="w-full h-14 font-black uppercase italic" disabled={!!importing} onClick={confirmImport}>
              {importing ? <Loader2 className="animate-spin" /> : `CONFIRMAR IMPORTAÇÃO DE ${preview.type.toUpperCase()}`}
            </Button>
          </section>
        )}
        <section className="pt-10 border-t-2 border-black/10">
          <div className="bg-red-50 p-6 space-y-4">
            <div className="flex items-center gap-2 text-red-600">
              <Trash2 className="w-5 h-5" />
              <h3 className="text-xs font-black uppercase tracking-widest">Zona de Perigo</h3>
            </div>
            <p className="text-[10px] font-bold text-red-700 uppercase leading-relaxed">
              Esta ação apagará todos os dados de atletas, eventos, ringues e lutas atuais, restaurando o banco de dados para os valores padrão de fábrica.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full h-12 font-black uppercase italic rounded-none">
                  RESETAR TODO O SISTEMA
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-none border-2 border-black">
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-black uppercase italic">Tem certeza absoluta?</AlertDialogTitle>
                  <AlertDialogDescription className="text-xs font-medium uppercase text-muted-foreground leading-relaxed">
                    Esta ação é irreversível. Todos os dados atuais do torneio serão permanentemente removidos.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="font-black uppercase text-[10px] rounded-none">Cancelar</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleResetSystem} 
                    disabled={isResetting}
                    className="font-black uppercase text-[10px] rounded-none bg-red-600 hover:bg-red-700 text-white"
                  >
                    {isResetting ? "Limpando..." : "Sim, Apagar Tudo"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}