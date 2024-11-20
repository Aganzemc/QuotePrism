import React from 'react';
import { useStore } from '../store';
import QuoteCard from '../components/QuoteCard';
import { quotes } from '../data/quotes';

export default function Categories() {
  const language = useStore((state) => state.language);
  const categories = [...new Set(quotes.map(quote => quote.category))];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        {language === 'en' ? 'Categories' : 'Catégories'}
      </h1>
      
      {categories.map(category => (
        <section key={category} className="space-y-4">
          <h2 className="text-2xl font-semibold capitalize">
            {language === 'en' ? category : category}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quotes
              .filter(quote => quote.category === category)
              .map(quote => (
                <QuoteCard key={quote.id} quote={quote} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}