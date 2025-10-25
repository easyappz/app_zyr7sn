import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import MainLayout from './layout/MainLayout';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.handleRoutes === 'function') {
      window.handleRoutes(['/', '/cart', '/checkout', '/profile']);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div data-easytag="id1-react/src/App.js" className="min-h-screen bg-white">
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
