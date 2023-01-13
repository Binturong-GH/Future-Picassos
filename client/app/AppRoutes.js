import React from 'react';
import ProductsList from './components/ProductsList';
import SingleProduct from './components/SingleProduct';
import { Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <main>
      <h1 className='title'>Welcome to Grace shopper</h1>
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/products' element={<ProductsList />} />
        <Route path='/products/:productId' element={<SingleProduct />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </main>
  );
};

export default AppRoutes;
