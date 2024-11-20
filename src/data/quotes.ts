import { Quote } from '../types';

export const quotes: Quote[] = [
  {
    id: 1,
    text: {
      en: "Life is what happens while you're busy making other plans.",
      fr: "La vie est ce qui arrive pendant que vous êtes occupé à faire d'autres projets."
    },
    author: "John Lennon",
    category: "life"
  },
  {
    id: 2,
    text: {
      en: "The only way to do great work is to love what you do.",
      fr: "La seule façon de faire du bon travail est d'aimer ce que vous faites."
    },
    author: "Steve Jobs",
    category: "work"
  },
  // Add more quotes as needed
];