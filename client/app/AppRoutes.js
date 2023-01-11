import React from "react";
import ProductsList from './components/ProductsList';

const AppRoutes = () => {
  return (
    <div>
      <h1>Welcome to Grace shopper</h1>
      <Route path="/products" element={<ProductsList />} />
    </div>
  );
};

export default AppRoutes;
