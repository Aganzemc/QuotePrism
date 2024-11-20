import React from 'react';
import { useStore } from '../store';
import { quotes } from '../data/quotes';
import { Quote } from '../types';
import { validateQuote } from '../utils/validation';
import { AlertCircle, X } from 'lucide-react';

interface FormData {
  textEn: string;
  textFr: string;
  author: string;
  category: string;
  submittedBy: string;
}

const initialFormData: FormData = {
  textEn: '',
  textFr: '',
  author: '',
  category: '',
  submittedBy: '',
};

export default function AddQuoteForm({ onSubmit, onClose }: { onSubmit: (quote: Quote) => void, onClose: () => void }) {
  const language = useStore((state) => state.language);
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const categories = [...new Set(quotes.map(quote => quote.category))];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const quoteData = {
      text: {
        en: formData.textEn,
        fr: formData.textFr,
      },
      author: formData.author,
      category: formData.category,
      submittedBy: formData.submittedBy,
    };

    const { isValid, errors: validationErrors } = validateQuote(quoteData);

    if (!isValid) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const newQuote: Quote = {
      id: Math.max(...quotes.map(q => q.id)) + 1,
      ...quoteData,
      submittedAt: new Date().toISOString(),
    };

    onSubmit(newQuote);
    setFormData(initialFormData);
    setIsSubmitting(false);
  };

  const renderError = (field: string) => {
    if (!errors[field]) return null;
    return (
      <p className="text-red-500 text-xs sm:text-sm flex items-center mt-1">
        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
        {errors[field]}
      </p>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl my-4">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold">
            {language === 'en' ? 'Add New Quote' : 'Ajouter une Citation'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {language === 'en' ? 'Quote in English' : 'Citation en Anglais'}
            </label>
            <textarea
              value={formData.textEn}
              onChange={(e) => setFormData({ ...formData, textEn: e.target.value })}
              className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm sm:text-base ${
                errors.textEn ? 'border-red-500' : ''
              }`}
              rows={3}
            />
            {renderError('textEn')}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {language === 'en' ? 'Quote in French' : 'Citation en Français'}
            </label>
            <textarea
              value={formData.textFr}
              onChange={(e) => setFormData({ ...formData, textFr: e.target.value })}
              className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm sm:text-base ${
                errors.textFr ? 'border-red-500' : ''
              }`}
              rows={3}
            />
            {renderError('textFr')}
          </div>

          {renderError('translation')}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                {language === 'en' ? 'Author' : 'Auteur'}
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm sm:text-base ${
                  errors.author ? 'border-red-500' : ''
                }`}
              />
              {renderError('author')}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {language === 'en' ? 'Category' : 'Catégorie'}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm sm:text-base ${
                  errors.category ? 'border-red-500' : ''
                }`}
              >
                <option value="">{language === 'en' ? 'Select category' : 'Sélectionner une catégorie'}</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
                <option value="new">{language === 'en' ? 'New category' : 'Nouvelle catégorie'}</option>
              </select>
              {renderError('category')}
            </div>
          </div>

          {formData.category === 'new' && (
            <div>
              <label className="block text-sm font-medium mb-1">
                {language === 'en' ? 'New Category Name' : 'Nom de la Nouvelle Catégorie'}
              </label>
              <input
                type="text"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm sm:text-base"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              {language === 'en' ? 'Your Name' : 'Votre Nom'}
            </label>
            <input
              type="text"
              value={formData.submittedBy}
              onChange={(e) => setFormData({ ...formData, submittedBy: e.target.value })}
              className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 text-sm sm:text-base ${
                errors.submittedBy ? 'border-red-500' : ''
              }`}
            />
            {renderError('submittedBy')}
          </div>

          <div className="flex justify-end space-x-3 sm:space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              disabled={isSubmitting}
            >
              {language === 'en' ? 'Cancel' : 'Annuler'}
            </button>
            <button
              type="submit"
              className="px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? (language === 'en' ? 'Submitting...' : 'Soumission...')
                : (language === 'en' ? 'Submit' : 'Soumettre')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}