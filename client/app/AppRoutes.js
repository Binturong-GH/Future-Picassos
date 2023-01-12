import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';

const AppRoutes = () => {
  return (
    <div>
      <main>
        <Routes>
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
};

export default AppRoutes;
