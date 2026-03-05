import { Athlete, Category, Event, Ring, Match } from './types';
export const MOCK_ATHLETES: Athlete[] = [
  {
    id: 'a1',
    name: 'Ricardo Silva',
    club: 'Hyo Team',
    belt: 'Black',
    age: 24,
    points: 120,
    modalityPoints: {
      SPARRING: 60,
      FORMAS_TRADICIONAIS: 40,
      ARMAS: 20,
      AVANCADO_PRETAS: 0,
      COMBATE_ARMADO: 0
    },
    modalities: ['SPARRING', 'FORMAS_TRADICIONAIS', 'ARMAS']
  },
  {
    id: 'a2',
    name: 'Ana Oliveira',
    club: 'Tiger TKD',
    belt: 'Black',
    age: 22,
    points: 115,
    modalityPoints: {
      SPARRING: 115,
      FORMAS_TRADICIONAIS: 0,
      ARMAS: 0,
      AVANCADO_PRETAS: 0,
      COMBATE_ARMADO: 0
    },
    modalities: ['SPARRING']
  },
  {
    id: 'a3',
    name: 'Bruno Santos',
    club: 'Hyo Team',
    belt: 'Red',
    age: 19,
    points: 80,
    modalityPoints: {
      SPARRING: 40,
      ARMAS: 40,
      FORMAS_TRADICIONAIS: 0,
      AVANCADO_PRETAS: 0,
      COMBATE_ARMADO: 0
    },
    modalities: ['SPARRING', 'ARMAS']
  },
  {
    id: 'a4',
    name: 'Carla Souza',
    club: 'Elite Martial',
    belt: 'Blue',
    age: 20,
    points: 45,
    modalityPoints: {
      SPARRING: 45,
      FORMAS_TRADICIONAIS: 0,
      ARMAS: 0,
      AVANCADO_PRETAS: 0,
      COMBATE_ARMADO: 0
    },
    modalities: ['SPARRING']
  },
  {
    id: 'a5',
    name: 'Diego Costa',
    club: 'Dragon Way',
    belt: 'Black',
    age: 28,
    points: 150,
    modalityPoints: {
      SPARRING: 80,
      AVANCADO_PRETAS: 70,
      FORMAS_TRADICIONAIS: 0,
      ARMAS: 0,
      COMBATE_ARMADO: 0
    },
    modalities: ['SPARRING', 'AVANCADO_PRETAS']
  }
];
export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat1', name: 'Adult Male Black Belt -74kg', type: 'SPARRING', beltRange: ['Black'], ageRange: [18, 35] },
  { id: 'cat2', name: 'Adult Female Black Belt -62kg', type: 'SPARRING', beltRange: ['Black'], ageRange: [18, 35] },
  { id: 'cat3', name: 'Poomsae Individual Male Black', type: 'FORMAS_TRADICIONAIS', beltRange: ['Black'], ageRange: [18, 99] },
];
export const MOCK_EVENTS: Event[] = [
  {
    id: 'evt-2026-1',
    name: 'Torneio Brasília 2026',
    date: '2026-05-15',
    location: 'Brasília, DF',
    isNational: false,
    status: 'Upcoming'
  },
  {
    id: 'evt-2026-2',
    name: 'Hyo Challenge 2026',
    date: '2026-11-20',
    location: 'Local TBD',
    isNational: true,
    status: 'Upcoming'
  },
];
export const MOCK_RINGS: Ring[] = [
  {
    id: 'r1',
    name: 'Arena A',
    letter: 'A',
    ageRange: 'Adulto',
    status: 'Open',
    supportedModalities: ['SPARRING', 'FORMAS_TRADICIONAIS'],
    participants: [
      { athleteId: 'a1', selectedModalities: ['SPARRING', 'FORMAS_TRADICIONAIS'] },
      { athleteId: 'a2', selectedModalities: ['SPARRING'] }
    ]
  },
  { 
    id: 'r2', 
    name: 'Arena B', 
    letter: 'B', 
    ageRange: 'Juvenil', 
    status: 'Open', 
    supportedModalities: ['ARMAS'], 
    participants: [] 
  },
];
export const MOCK_MATCHES: Match[] = [];
export const MOCK_CONTACTS = [
  { name: 'Mestre Hyo', role: 'Coordenação Geral', phone: '5511999999999', email: 'contato@hyotkd.com' },
];