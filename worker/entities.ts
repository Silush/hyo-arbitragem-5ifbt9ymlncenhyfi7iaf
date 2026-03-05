import { IndexedEntity } from "./core-utils";
import type { Athlete, Event, Ring, Match, Modality } from "../shared/types";
import { MOCK_ATHLETES, MOCK_EVENTS, MOCK_RINGS, MOCK_MATCHES } from "../shared/mock-data";
export class AthleteEntity extends IndexedEntity<Athlete> {
  static readonly entityName = "athlete";
  static readonly indexName = "athletes";
  static readonly initialState: Athlete = {
    id: "",
    name: "",
    club: "",
    belt: "White",
    age: 0,
    points: 0,
    modalities: [],
    modalityPoints: {
      SPARRING: 0,
      FORMAS_TRADICIONAIS: 0,
      ARMAS: 0,
      AVANCADO_PRETAS: 0,
      COMBATE_ARMADO: 0
    }
  };
  static seedData = MOCK_ATHLETES;
}
export class EventEntity extends IndexedEntity<Event> {
  static readonly entityName = "event";
  static readonly indexName = "events";
  static readonly initialState: Event = { id: "", name: "", date: "", location: "", isNational: false, status: "Upcoming" };
  static seedData = MOCK_EVENTS;
}
export class RingEntity extends IndexedEntity<Ring> {
  static readonly entityName = "ring";
  static readonly indexName = "rings";
  static readonly initialState: Ring = {
    id: "",
    name: "",
    letter: "",
    status: "Closed",
    ageRange: "Adulto",
    supportedModalities: []
  };
  static seedData = MOCK_RINGS;
}
export class MatchEntity extends IndexedEntity<Match> {
  static readonly entityName = "match";
  static readonly indexName = "matches";
  static readonly initialState: Match = {
    id: "",
    ringId: "",
    categoryId: "",
    athleteBlueId: "",
    athleteRedId: "",
    status: "Pending",
    type: 'SPARRING' as Modality,
    score: { blue: 0, red: 0, bluePenalties: 0, redPenalties: 0 },
    round: 1,
    scheduledTime: 0
  };
  static seedData = MOCK_MATCHES;
  async updateScore(score: Match['score']): Promise<Match> {
    return this.mutate(s => ({ ...s, score }));
  }
  async finishMatch(winnerId: string, condition: Match['winCondition']): Promise<Match> {
    return this.mutate(s => ({ ...s, status: 'Completed', winnerId, winCondition: condition }));
  }
}