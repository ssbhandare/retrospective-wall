export interface RetroCard {
  id: number;
  text: string;
  createdAt: Date;
}

export interface RetroSection {
  id: string;
  title: string;
  cards: RetroCard[];
}