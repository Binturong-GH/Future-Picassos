import React, { useEffect } from "react";
import ProductsList from "./components/ProductsList";
import SingleProduct from "./components/SingleProduct";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import UsersListPage from "./pages/UsersListPage";
import ProductListpage from "./pages/ProductsListPage";

// socket
import socket from "./utils/socket";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsAsync, fetchOneProductAsync } from "./store";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    socket.on("connect", () => {
      // admin create a new product
      socket.on("product/create", (message) => {
        dispatch(fetchAllProductsAsync());
      });

      // admin edit a exist product
      socket.on("product/edit", (message) => {
        if (product.id === message.product.id) {
          dispatch(fetchOneProductAsync(message.product.id));
        }
      });
    });
  }, []);

  return (
    <main>
      <h1 className="title">Welcome to Grace shopper</h1>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/users" element={<UsersListPage />} />
        <Route path="/admin/products" element={<ProductListpage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
};

export default AppRoutes;
