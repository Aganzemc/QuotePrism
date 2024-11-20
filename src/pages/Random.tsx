import React from 'react';
import { useStore } from '../store';
import QuoteCard from '../components/QuoteCard';
import { quotes } from '../data/quotes';

export default function Random() {
  const language = useStore((state) => state.language);
  const [currentQuote, setCurrentQuote] = React.useState(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  });

  const getRandomQuote = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (quotes[newIndex].id === currentQuote.id);
    setCurrentQuote(quotes[newIndex]);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">
        {language === 'en' ? 'Random Quote' : 'Citation Aléatoire'}
      </h1>
      
      <QuoteCard quote={currentQuote} />
      
      <div className="text-center">
        <button
          onClick={getRandomQuote}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {language === 'en' ? 'Get Another Quote' : 'Nouvelle Citation'}
        </button>
      </div>
    </div>
  );
}