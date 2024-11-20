import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Quote, Menu } from 'lucide-react';
import { useStore } from '../store';

export default function Navbar() {
  const { language, theme, setLanguage, toggleTheme } = useStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className={`${theme === 'dark' ? 'dark:bg-gray-800 text-white' : 'bg-white'} shadow-lg`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Quote className="w-8 h-8" />
            <span className="text-xl font-bold">QuotePrism</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-blue-500 transition-colors">
              {language === 'en' ? 'Home' : 'Accueil'}
            </Link>
            <Link to="/categories" className="hover:text-blue-500 transition-colors">
              {language === 'en' ? 'Categories' : 'Catégories'}
            </Link>
            <Link to="/random" className="hover:text-blue-500 transition-colors">
              {language === 'en' ? 'Random' : 'Aléatoire'}
            </Link>
            <Link to="/favorites" className="hover:text-blue-500 transition-colors">
              {language === 'en' ? 'Favorites' : 'Favoris'}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {language === 'en' ? 'FR' : 'EN'}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link to="/" className="block py-2">
              {language === 'en' ? 'Home' : 'Accueil'}
            </Link>
            <Link to="/categories" className="block py-2">
              {language === 'en' ? 'Categories' : 'Catégories'}
            </Link>
            <Link to="/random" className="block py-2">
              {language === 'en' ? 'Random' : 'Aléatoire'}
            </Link>
            <Link to="/favorites" className="block py-2">
              {language === 'en' ? 'Favorites' : 'Favoris'}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}