import React from 'react';
import { useStore } from '../store';
import QuoteCard from '../components/QuoteCard';
import { quotes } from '../data/quotes';

export default function Favorites() {
  const language = useStore((state) => state.language);
  const [favorites, setFavorites] = React.useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (id: number) => {
    const newFavorites = favorites.filter(fav => fav !== id);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const favoriteQuotes = quotes.filter(quote => favorites.includes(quote.id));

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">
        {language === 'en' ? 'Favorite Quotes' : 'Citations Favorites'}
      </h1>

      {favoriteQuotes.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          {language === 'en' 
            ? 'No favorite quotes yet. Add some from the home page!' 
            : "Pas encore de citations favorites. Ajoutez-en depuis la page d'accueil !"}
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favoriteQuotes.map(quote => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              onFavorite={() => toggleFavorite(quote.id)}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}