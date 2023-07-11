import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { MainLayout } from './layouts/MainLayout';
import AuthProvider from './components/auth/AuthProvider';
import LogIn from './components/auth/buttons/LogIn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
        </Route>
        <Route path="/auth" element={<MainLayout />}>
          <Route index element={<AuthProvider><LogIn /></AuthProvider>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
