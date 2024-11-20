import React from 'react';
import { useStore } from '../store';
import { Plus } from 'lucide-react';
import QuoteCard from '../components/QuoteCard';
import AddQuoteForm from '../components/AddQuoteForm';
import { quotes } from '../data/quotes';
import { Quote } from '../types';

export default function Home() {
  const language = useStore((state) => state.language);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [localQuotes, setLocalQuotes] = React.useState<Quote[]>(() => {
    const saved = localStorage.getItem('quotes');
    return saved ? [...quotes, ...JSON.parse(saved)] : quotes;
  });
  const [favorites, setFavorites] = React.useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleAddQuote = (newQuote: Quote) => {
    const updatedQuotes = [...localQuotes, newQuote];
    setLocalQuotes(updatedQuotes);
    const savedQuotes = updatedQuotes.filter(q => !quotes.find(original => original.id === q.id));
    localStorage.setItem('quotes', JSON.stringify(savedQuotes));
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
          {language === 'en' ? 'Daily Wisdom' : 'Sagesse Quotidienne'}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
          {language === 'en'
            ? 'Discover inspiring quotes and timeless proverbs'
            : 'Découvrez des citations inspirantes et des proverbes intemporels'}    
        </p>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          {language === 'en' ? 'Add Quote' : 'Ajouter une Citation'}
        </button>
      </header>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
        {localQuotes.map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            onFavorite={() => toggleFavorite(quote.id)}
            isFavorite={favorites.includes(quote.id)}
          />
        ))}
      </div>

      {showAddForm && (
        <AddQuoteForm
          onSubmit={handleAddQuote}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}