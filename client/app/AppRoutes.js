import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import SignupPage from './pages/SignupPage';

const AppRoutes = () => {
  return (
    <div>
      <main>
        <Routes>
          <Route path='/' element={<h1>Home</h1>} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<SignupPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default AppRoutes;
