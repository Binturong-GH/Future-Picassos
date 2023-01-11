import React, { Fragment, useEffect } from "react";
import { fetchAllProductsAsync } from "../store/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

function ProductsList() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  console.log(products);
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, []);

  const renderedProductsList = products.map((product) => {
    return (
      <div key={product.id}>
        <Box>
          <Link to={`/products/${product.id}`}>
            <h3>{product.title}</h3>
          </Link>
        </Box>
      </div>
    );
  });
  return <Fragment>{renderedProductsList}Hello</Fragment>;
}

export default ProductsList;
