
export type Mood = 'Low' | 'Okay' | 'Good';

export interface Species {
  id?: string;
  commonName: string;
  scientificName: string;
  genus: string;
  confidence: number;
  family: string;
  origin: string;
  isNative: boolean;
  isInvasive: boolean;
  heightMeters: number;
  lifespanYears: number;
  moisturePreference: string;
  summary: string;
  care: string;
  imageUrl?: string | null;
  uses: string[];
  wildlife: string[];
  symbolism: string;
  funFact: string;
}

export interface MoodLog {
  speciesId: string;
  timestamp: number;
  mood: Mood;
}

export interface CollectionEntry extends Species {
  id: string;
  firstSeenDate: number;
  lastSeenDate: number;
  scanCount: number;
  averageMood?: number;
}

export enum View {
  Scan = 'SCAN',
  TreeDex = 'TREEDEX'
}
