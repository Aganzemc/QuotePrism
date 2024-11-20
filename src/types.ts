export interface Quote {
  id: number;
  text: {
    en: string;
    fr: string;
  };
  author: string;
  category: string;
  submittedBy?: string;
  submittedAt?: string;
}

export type Language = 'en' | 'fr';
export type Theme = 'light' | 'dark';