import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';

const AppRoutes = () => {
  return (
    <div>
      <main>
        <Route path='/cart' element={<Cart />} />
      </main>
    </div>
  );
};

export default AppRoutes;
