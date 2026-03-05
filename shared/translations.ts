export type Language = 'pt' | 'en' | 'es';
export const translations = {
  pt: {
    auth: {
      title: "HYO Arbitragem",
      subtitle: "Selecione seu perfil para continuar",
      footer: "Protótipo Fase 3: Excelência Arena",
      referee: "Árbitro",
      referee_desc: "Julgar lutas na arena",
      table: "Oficial de Mesa",
      table_desc: "Gerenciar fila e cronômetros",
      coordinator: "Coordenador",
      coordinator_desc: "Supervisionar anéis e resultados"
    },
    nav: {
      home: "Início",
      rings: "Ringues",
      rank: "Ranking",
      rules: "Regras"
    },
    dashboard: {
      title: "Painel de Controle",
      live: "Ao Vivo",
      rings_title: "Gestão de Ringues",
      quick_actions: "Ações Rápidas",
      active: "Ativo",
      paused: "Pausado",
      next_matches: "Próximas lutas: {{count}}",
      rankings: "Rankings",
      rules: "Regras do Evento"
    },
    ring: {
      schedule: "Cronograma de Lutas",
      active_match: "Luta Ativa",
      no_active: "Nenhuma luta ativa no momento",
      upcoming: "Próximas Lutas",
      call_next: "Chamar Próximo",
      close_ring: "Fechar Ringue",
      resume: "Retomar Pontuação",
      call_athlete: "Chamar Atleta",
      match_queue: "Fila de Espera"
    },
    arena: {
      blue_corner: "Canto Azul",
      red_corner: "Canto Vermelho",
      penalty: "FALTA",
      round: "ROUND",
      start: "INICIAR",
      pause: "PAUSAR",
      finish: "FINALIZAR",
      reset: "Reiniciar Round",
      undo_blue: "Desfazer Azul",
      undo_red: "Desfazer Vermelho",
      confirm_finish: "Deseja finalizar a luta?",
      confirm_undo: "Confirmar reversão de ponto?",
      match_completed: "Luta finalizada com sucesso",
      point_gap_win: "Vitória por Superioridade (Gap)"
    },
    rules: {
      title: "Livro de Regras Digital",
      subtitle: "Regras Oficiais WT/HYO",
      scoring: "Pontuação (Kyorugui)",
      duration: "Duração da Luta",
      penalties: "Gam-jeom (Faltas)",
      ranking_logic: "Lógica de Ranking",
      gap_rule: "Regra de Superioridade (Gap)",
      gap_desc: "Uma diferença de 20 pontos ao final do segundo round resulta em vitória automática por superioridade.",
      points: {
        punch: "Soco no Protetor",
        kick_trunk: "Chute no Protetor",
        kick_head: "Chute na Cabeça",
        turn_trunk: "Chute Giratório (Tronco)",
        turn_head: "Chute Giratório (Cabeça)"
      }
    },
    ranking: {
      title: "Classificação Geral",
      subtitle: "Status de qualificação para o Grand Masters",
      filter_all: "Todos",
      filter_black: "Faixa Preta",
      filter_color: "Coloridas",
      top4: "TOP 4",
      qualified: "Qualificado para o Nacional"
    }
  },
  en: {
    auth: {
      title: "HYO Refereeing",
      subtitle: "Select your profile to continue",
      footer: "Prototype Phase 3: Arena Excellence",
      referee: "Referee",
      referee_desc: "Judge matches in the arena",
      table: "Table Official",
      table_desc: "Manage queue and timers",
      coordinator: "Coordinator",
      coordinator_desc: "Oversee rings and results"
    },
    nav: {
      home: "Home",
      rings: "Rings",
      rank: "Rank",
      rules: "Rules"
    },
    dashboard: {
      title: "Dashboard",
      live: "Live",
      rings_title: "Ring Management",
      quick_actions: "Quick Actions",
      active: "Active",
      paused: "Paused",
      next_matches: "Next matches: {{count}}",
      rankings: "Rankings",
      rules: "Event Rules"
    },
    ring: {
      schedule: "Match Schedule",
      active_match: "Active Match",
      no_active: "No match currently active",
      upcoming: "Upcoming Matches",
      call_next: "Call Next",
      close_ring: "Close Ring",
      resume: "Resume Scoring",
      call_athlete: "Call Athlete",
      match_queue: "Match Queue"
    },
    arena: {
      blue_corner: "Blue Corner",
      red_corner: "Red Corner",
      penalty: "PENALTY",
      round: "ROUND",
      start: "START",
      pause: "PAUSE",
      finish: "FINISH",
      reset: "Reset Round",
      undo_blue: "Undo Blue",
      undo_red: "Undo Red",
      confirm_finish: "Do you want to finish the match?",
      confirm_undo: "Confirm point reversal?",
      match_completed: "Match completed successfully",
      point_gap_win: "Win by Point Gap"
    },
    rules: {
      title: "Digital Rulebook",
      subtitle: "Official WT/HYO Rules",
      scoring: "Scoring (Kyorugui)",
      duration: "Match Duration",
      penalties: "Gam-jeom (Penalties)",
      ranking_logic: "Ranking Logic",
      gap_rule: "Point Gap Rule",
      gap_desc: "A 20-point lead at the end of the second round results in an automatic win by point gap.",
      points: {
        punch: "Punch to Trunk",
        kick_trunk: "Kick to Trunk",
        kick_head: "Kick to Head",
        turn_trunk: "Turning Kick (Trunk)",
        turn_head: "Turning Kick (Head)"
      }
    },
    ranking: {
      title: "Leaderboards",
      subtitle: "Qualification status for the Grand Masters",
      filter_all: "All",
      filter_black: "Black Belt",
      filter_color: "Color Belts",
      top4: "TOP 4",
      qualified: "Qualified for Nationals"
    }
  },
  es: {
    auth: {
      title: "HYO Arbitraje",
      subtitle: "Seleccione su perfil para continuar",
      footer: "Prototipo Fase 3: Excelencia Arena",
      referee: "Árbitro",
      referee_desc: "Juzgar combates en la arena",
      table: "Oficial de Mesa",
      table_desc: "Gestionar cola y cronómetros",
      coordinator: "Coordinador",
      coordinator_desc: "Supervisar áreas y resultados"
    },
    nav: {
      home: "Inicio",
      rings: "Áreas",
      rank: "Ranking",
      rules: "Reglas"
    },
    dashboard: {
      title: "Panel",
      live: "En Vivo",
      rings_title: "Gestión de Áreas",
      quick_actions: "Acciones Rápidas",
      active: "Activo",
      paused: "Pausado",
      next_matches: "Próximos combates: {{count}}",
      rankings: "Rankings",
      rules: "Reglas del Evento"
    },
    ring: {
      schedule: "Calendario de Combates",
      active_match: "Combate Activo",
      no_active: "No hay combate activo actualmente",
      upcoming: "Próximos Combates",
      call_next: "Llamar Siguiente",
      close_ring: "Cerrar Área",
      resume: "Continuar Puntuación",
      call_athlete: "Llamar Atleta",
      match_queue: "Cola de Combates"
    },
    arena: {
      blue_corner: "Esquina Azul",
      red_corner: "Esquina Roja",
      penalty: "FALTA",
      round: "ROUND",
      start: "INICIAR",
      pause: "PAUSAR",
      finish: "FINALIZAR",
      reset: "Reiniciar Round",
      undo_blue: "Deshacer Azul",
      undo_red: "Deshacer Rojo",
      confirm_finish: "¿Desea finalizar el combate?",
      confirm_undo: "¿Confirmar reversión?",
      match_completed: "Combate finalizado con éxito",
      point_gap_win: "Victoria por Diferencia (Gap)"
    },
    rules: {
      title: "Reglamento Digital",
      subtitle: "Reglas Oficiales WT/HYO",
      scoring: "Puntuación (Kyorugui)",
      duration: "Duración del Combate",
      penalties: "Gam-jeom (Faltas)",
      ranking_logic: "Lógica de Ranking",
      gap_rule: "Regra de Diferencia (Gap)",
      gap_desc: "Una diferencia de 20 puntos al final del segundo asalto resulta en victoria automática.",
      points: {
        punch: "Puño al Tronco",
        kick_trunk: "Patada al Tronco",
        kick_head: "Patada a la Cabeza",
        turn_trunk: "Patada Giratoria (Tronco)",
        turn_head: "Patada Giratoria (Cabeza)"
      }
    },
    ranking: {
      title: "Clasificación",
      subtitle: "Estado de calificación para el Grand Masters",
      filter_all: "Todos",
      filter_black: "Cinturón Negro",
      filter_color: "Cinturones Color",
      top4: "TOP 4",
      qualified: "Calificado para el Nacional"
    }
  }
};