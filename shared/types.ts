export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type BeltLevel = 'White' | 'Yellow' | 'Green' | 'Blue' | 'Red' | 'Black';
export type Modality = 'FORMAS_TRADICIONAIS' | 'ARMAS' | 'SPARRING' | 'COMBATE_ARMADO' | 'AVANCADO_PRETAS';
export type MatchStatus = 'Pending' | 'Calling' | 'Active' | 'Completed' | 'Canceled';
export type WinCondition = 'Points' | 'Gap' | 'KOR' | 'Disqualification' | 'Withdrawal' | 'Superiority';
export type AgeCategory = 'Infantil' | 'Juvenil' | 'Adulto' | 'Senior';
export interface Athlete {
  id: string;
  name: string;
  club: string;
  belt: BeltLevel;
  weightClass?: string;
  age: number;
  points: number; // Total points
  modalityPoints: Record<Modality, number>;
  modalities: Modality[];
}
export interface Category {
  id: string;
  name: string;
  type: Modality;
  beltRange: BeltLevel[];
  ageRange: [number, number];
}
export interface Score {
  blue: number;
  red: number;
  bluePenalties: number;
  redPenalties: number;
}
export interface Match {
  id: string;
  ringId: string;
  categoryId: string;
  athleteBlueId: string;
  athleteRedId: string;
  status: MatchStatus;
  type: Modality;
  score: Score;
  winnerId?: string;
  winCondition?: WinCondition;
  round: number;
  scheduledTime: number;
}
export interface RingParticipant {
  athleteId: string;
  selectedModalities: Modality[];
}
export interface Ring {
  id: string;
  name: string;
  letter: string; // A, B, C...
  ageRange: AgeCategory;
  supportedModalities: Modality[]; // Updated from modality
  currentMatchId?: string;
  coordinatorId?: string;
  status: 'Open' | 'Closed' | 'Paused';
  participants?: RingParticipant[];
}
export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  isNational: boolean;
  status: 'Upcoming' | 'Active' | 'Finished';
}
export interface RankingEntry {
  athleteId: string;
  athleteName: string;
  club: string;
  rank: number;
  points: number;
  qualified: boolean;
}