import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PopularPage } from './pages/PopularPage';
import { FreshPage } from './pages/FreshPage';
import { RoutesPage } from './pages/RoutesPage';
import { MainLayout } from './layouts/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<PopularPage />} />
          <Route path="/fresh" element={<FreshPage />} />
          <Route path="/routes" element={<RoutesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
