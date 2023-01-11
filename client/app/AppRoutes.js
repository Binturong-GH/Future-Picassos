import React from "react";
import ProductsList from "./components/ProductsList";
import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <div>
      <h1>Welcome to Grace shopper</h1>
      <Routes>
        <Route path="/products" element={<ProductsList />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
