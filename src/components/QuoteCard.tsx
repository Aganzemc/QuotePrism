import React from 'react';
import { Heart, User, Clock } from 'lucide-react';
import { Quote } from '../types';
import { useStore } from '../store';

interface QuoteCardProps {
  quote: Quote;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

export default function QuoteCard({ quote, onFavorite, isFavorite = false }: QuoteCardProps) {
  const language = useStore((state) => state.language);
  const theme = useStore((state) => state.theme);

  return (
    <div className={`p-4 sm:p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} transition-all hover:shadow-xl`}>
      <div className="flex justify-between items-start gap-4">
        <blockquote className="text-base sm:text-lg mb-4 flex-grow">
          "{quote.text[language]}"
        </blockquote>
        {onFavorite && (
          <button
            onClick={onFavorite}
            className={`flex-shrink-0 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isFavorite ? 'text-red-500' : ''
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>
      <footer className="space-y-2">
        <cite className="block text-right text-sm italic">- {quote.author}</cite>
        {quote.submittedBy && (
          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {quote.submittedBy}
            </span>
            {quote.submittedAt && (
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(quote.submittedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        )}
      </footer>
    </div>
  );
}