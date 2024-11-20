import { Quote } from '../types';

export function validateQuote(quote: Partial<Quote>) {
  const errors: Record<string, string> = {};

  // Validate English text
  if (!quote.text?.en?.trim()) {
    errors.textEn = 'English text is required';
  } else if (quote.text.en.length < 10) {
    errors.textEn = 'Quote must be at least 10 characters long';
  }

  // Validate French text
  if (!quote.text?.fr?.trim()) {
    errors.textFr = 'French text is required';
  } else if (quote.text.fr.length < 10) {
    errors.textFr = 'Quote must be at least 10 characters long';
  }

  // Validate translation consistency
  if (quote.text?.en && quote.text?.fr) {
    const enWordCount = quote.text.en.split(/\s+/).length;
    const frWordCount = quote.text.fr.split(/\s+/).length;
    const ratio = Math.abs(enWordCount - frWordCount) / Math.max(enWordCount, frWordCount);

    if (ratio > 0.5) {
      errors.translation = 'The translations seem too different in length. Please verify them.';
    }
  }

  // Validate author
  if (!quote.author?.trim()) {
    errors.author = 'Author is required';
  }

  // Validate category
  if (!quote.category?.trim()) {
    errors.category = 'Category is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}