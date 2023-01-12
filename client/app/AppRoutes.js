import React from 'react';
import ProductsList from './components/ProductsList';
import SingleProduct from './components/SingleProduct';
import { Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import SignupPage from './pages/SignupPage';

const AppRoutes = () => {
  return (
    <div>
      <main>
      <h1 className='title'>Welcome to Grace shopper</h1>
        <Routes>
        
          <Route path='/' element={<h1>Home</h1>} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<SignupPage />} />
          <Route path='/products' element={<ProductsList />} />
        <Route path='/products/:productId' element={<SingleProduct />} />
        </Routes>
      </main>
    </div>

  );
};

export default AppRoutes;
