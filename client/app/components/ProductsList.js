import React, { Fragment, useEffect } from "react";
import { fetchAllProductsAsync } from "../store/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


function ProductsList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, []);

  const renderedProductsList = products.map((product) => {
    return (
      <div key={product.id}>
        <Link to={`/products/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
      </div>
    );
  });
  return <Fragment>{renderedProductsList}</Fragment>;
}

export default ProductsList;
