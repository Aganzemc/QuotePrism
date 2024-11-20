import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Random from './pages/Random';
import Favorites from './pages/Favorites';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="random" element={<Random />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;