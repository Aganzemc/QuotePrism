import React from 'react';
import { Github, Twitter } from 'lucide-react';
import { useStore } from '../store';

export default function Footer() {
  const { language, theme } = useStore();
  
  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} shadow-lg mt-8`}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">QuotePrism</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? '© 2024 QuotePrism. All rights reserved.' 
                : '© 2024 QuotePrism. Tous droits réservés.'}
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="https://twitter.com/quotePrism"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/quotePrism"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}