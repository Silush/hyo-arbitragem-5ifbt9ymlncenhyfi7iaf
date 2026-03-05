import { Hono } from "hono";
import type { Env } from './core-utils';
import { EventEntity, RingEntity, MatchEntity, AthleteEntity } from "./entities";
import { Index, ok, bad, notFound } from './core-utils';
import { Athlete, Event, Ring, Match, Modality, RingParticipant, BeltLevel } from "../shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  app.get('/api/seed', async (c) => {
    await AthleteEntity.ensureSeed(c.env);
    await EventEntity.ensureSeed(c.env);
    await RingEntity.ensureSeed(c.env);
    await MatchEntity.ensureSeed(c.env);
    return ok(c, { message: "Sistemas HYO sincronizados com sucesso." });
  });
  app.post('/api/reset-data', async (c) => {
    try {
      const entities = ['athletes', 'events', 'rings', 'matches', 'sys-index-root'];
      for (const name of entities) {
        const idx = new Index<string>(c.env, name);
        await idx.clear();
      }
      await AthleteEntity.ensureSeed(c.env);
      await EventEntity.ensureSeed(c.env);
      await RingEntity.ensureSeed(c.env);
      await MatchEntity.ensureSeed(c.env);
      return ok(c, { message: "Banco de dados HYO resetado." });
    } catch (err: any) {
      return bad(c, `Falha ao resetar dados: ${err.message}`);
    }
  });
  app.post('/api/import-csv/athletes', async (c) => {
    const text = await c.req.text();
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length <= 1) return bad(c, "Arquivo vazio ou inválido");
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const items = lines.slice(1).map(line => {
      const cols = line.split(',').map(v => v.trim());
      const data: any = {};
      headers.forEach((h, i) => data[h] = cols[i]);
      const modalities = (data.modalidades || "").split(';').filter(Boolean) as Modality[];
      const athlete: Athlete = {
        id: crypto.randomUUID(),
        name: data.nome || "Atleta Importado",
        club: data.clube || "Independente",
        belt: (data.faixa || "White") as BeltLevel,
        age: parseInt(data.idade) || 0,
        points: parseInt(data.pontos) || 0,
        modalities,
        modalityPoints: {
          SPARRING: 0,
          FORMAS_TRADICIONAIS: 0,
          ARMAS: 0,
          AVANCADO_PRETAS: 0,
          COMBATE_ARMADO: 0
        }
      };
      return athlete;
    });
    for (const item of items) {
      await AthleteEntity.create(c.env, item);
    }
    return ok(c, { imported: items.length });
  });
  app.post('/api/import-csv/events', async (c) => {
    const text = await c.req.text();
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length <= 1) return bad(c, "Arquivo vazio ou inválido");
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const items = lines.slice(1).map(line => {
      const cols = line.split(',').map(v => v.trim());
      const data: any = {};
      headers.forEach((h, i) => data[h] = cols[i]);
      const event: Event = {
        id: crypto.randomUUID(),
        name: data.nome || "Evento Importado",
        date: data.data || new Date().toISOString().split('T')[0],
        location: data.local || "Brasil",
        isNational: data.nacional === 'true',
        status: 'Upcoming'
      };
      return event;
    });
    for (const item of items) {
      await EventEntity.create(c.env, item);
    }
    return ok(c, { imported: items.length });
  });
  app.get('/api/events', async (c) => {
    const page = await EventEntity.list(c.env);
    return ok(c, page.items);
  });
  app.get('/api/rings', async (c) => {
    const page = await RingEntity.list(c.env);
    return ok(c, page.items);
  });
  app.post('/api/rings', async (c) => {
    const { ageRange, supportedModalities } = await c.req.json();
    const existing = await RingEntity.list(c.env);
    const count = existing.items.length;
    const letter = String.fromCharCode(65 + count);
    const ring: Ring = {
      id: `ring-${crypto.randomUUID()}`,
      name: `Arena ${letter}`,
      letter,
      ageRange,
      supportedModalities: supportedModalities || [],
      status: 'Open',
      participants: []
    };
    await RingEntity.create(c.env, ring);
    return ok(c, ring);
  });
  app.get('/api/rings/:id', async (c) => {
    const ring = new RingEntity(c.env, c.req.param('id'));
    if (!await ring.exists()) return notFound(c);
    return ok(c, await ring.getState());
  });
  app.post('/api/rings/:id/athletes', async (c) => {
    const { participants } = await c.req.json() as { participants: RingParticipant[] };
    const ringInst = new RingEntity(c.env, c.req.param('id'));
    if (!await ringInst.exists()) return notFound(c);
    const updated = await ringInst.mutate(s => {
      const existingIds = new Set((s.participants || []).map(p => p.athleteId));
      const newParticipants = participants.filter(p => !existingIds.has(p.athleteId));
      return {
        ...s,
        participants: [...(s.participants || []), ...newParticipants]
      };
    });
    return ok(c, updated);
  });
  app.post('/api/rings/:id/draw', async (c) => {
    const ringId = c.req.param('id');
    const ringInst = new RingEntity(c.env, ringId);
    if (!await ringInst.exists()) return notFound(c);
    const ring = await ringInst.getState();
    const participants = ring.participants || [];
    if (participants.length === 0) return bad(c, "Nenhum participante vinculado.");
    const modalityOrder: Modality[] = ['FORMAS_TRADICIONAIS', 'ARMAS', 'SPARRING', 'AVANCADO_PRETAS', 'COMBATE_ARMADO'];
    let matchesCreated = 0;
    for (const currentModality of modalityOrder) {
      if (!ring.supportedModalities.includes(currentModality)) continue;
      const athletesInMod = participants
        .filter(p => p.selectedModalities.includes(currentModality))
        .map(p => p.athleteId)
        .sort(() => Math.random() - 0.5);
      if (athletesInMod.length === 0) continue;
      const isTechnique = currentModality === 'FORMAS_TRADICIONAIS' || currentModality === 'ARMAS';
      if (isTechnique) {
        for (let i = 0; i < athletesInMod.length; i++) {
          const match: Match = {
            id: `match-${crypto.randomUUID()}`,
            ringId,
            categoryId: 'cat-default',
            athleteBlueId: athletesInMod[i],
            athleteRedId: "",
            status: 'Pending',
            type: currentModality,
            score: { blue: 0, red: 0, bluePenalties: 0, redPenalties: 0 },
            round: 1,
            scheduledTime: Date.now() + matchesCreated * 60000
          };
          await MatchEntity.create(c.env, match);
          matchesCreated++;
        }
      } else {
        // Combat logic with bye handling
        for (let i = 0; i < athletesInMod.length; i += 2) {
          if (i + 1 < athletesInMod.length) {
            const match: Match = {
              id: `match-${crypto.randomUUID()}`,
              ringId,
              categoryId: 'cat-default',
              athleteBlueId: athletesInMod[i],
              athleteRedId: athletesInMod[i+1],
              status: 'Pending',
              type: currentModality,
              score: { blue: 0, red: 0, bluePenalties: 0, redPenalties: 0 },
              round: 1,
              scheduledTime: Date.now() + matchesCreated * 60000
            };
            await MatchEntity.create(c.env, match);
            matchesCreated++;
          } else {
            // Last athlete gets a bye (solitary pending match)
            const match: Match = {
              id: `match-${crypto.randomUUID()}`,
              ringId,
              categoryId: 'cat-default',
              athleteBlueId: athletesInMod[i],
              athleteRedId: "",
              status: 'Pending',
              type: currentModality,
              score: { blue: 0, red: 0, bluePenalties: 0, redPenalties: 0 },
              round: 1,
              scheduledTime: Date.now() + matchesCreated * 60000
            };
            await MatchEntity.create(c.env, match);
            matchesCreated++;
          }
        }
      }
    }
    return ok(c, { matches: matchesCreated });
  });
  app.get('/api/matches', async (c) => {
    const ringId = c.req.query('ringId');
    const athleteId = c.req.query('athleteId');
    const page = await MatchEntity.list(c.env);
    let items = page.items;
    if (ringId) items = items.filter(m => m.ringId === ringId);
    if (athleteId) items = items.filter(m => m.athleteBlueId === athleteId || m.athleteRedId === athleteId);
    return ok(c, items);
  });
  app.post('/api/matches/:id/score', async (c) => {
    const id = c.req.param('id');
    const score = await c.req.json();
    const matchInst = new MatchEntity(c.env, id);
    if (!await matchInst.exists()) return notFound(c);
    const updated = await matchInst.updateScore(score);
    return ok(c, updated);
  });
  app.post('/api/matches/:id/finish', async (c) => {
    const id = c.req.param('id');
    let { winnerId, winCondition } = await c.req.json();
    const matchInst = new MatchEntity(c.env, id);
    if (!await matchInst.exists()) return notFound(c);
    const match = await matchInst.getState();
    const updatedMatch = await matchInst.finishMatch(winnerId, winCondition || 'Points');
    if (winnerId) {
      const athlete = new AthleteEntity(c.env, winnerId);
      if (await athlete.exists()) {
        const pointsToAdd = (match.type === 'FORMAS_TRADICIONAIS' || match.type === 'ARMAS') ? 5 : 10;
        await athlete.mutate(s => {
          const modPts = s.modalityPoints || {
            SPARRING: 0, FORMAS_TRADICIONAIS: 0, ARMAS: 0, AVANCADO_PRETAS: 0, COMBATE_ARMADO: 0
          };
          const currentPoints = modPts[match.type] || 0;
          return {
            ...s,
            points: (s.points || 0) + pointsToAdd,
            modalityPoints: {
              ...modPts,
              [match.type]: currentPoints + pointsToAdd
            }
          };
        });
      }
    }
    return ok(c, updatedMatch);
  });
  app.get('/api/athletes', async (c) => {
    const page = await AthleteEntity.list(c.env);
    return ok(c, page.items);
  });
}