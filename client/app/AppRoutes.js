import React from "react";
import ProductsList from "./components/ProductsList";
import SingleProduct from "./components/SingleProduct";
import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <div>
      <h1 className="title">Welcome to Grace shopper</h1>
      <Routes>
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
