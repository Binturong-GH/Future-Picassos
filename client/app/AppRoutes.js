
import React from "react";
import ProductsList from "./components/ProductsList";
import SingleProduct from "./components/SingleProduct";
import { Routes, Route } from "react-router-dom";
import Cart from './pages/Cart';


const AppRoutes = () => {
  return (
   <main>
        <Routes>
      <h1 className="title">Welcome to Grace shopper</h1>
      <Routes>
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </main>
  );
};

export default AppRoutes;
