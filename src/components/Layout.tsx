import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useStore } from '../store';

export default function Layout() {
  const theme = useStore((state) => state.theme);
  
  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}