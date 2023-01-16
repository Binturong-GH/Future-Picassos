import React, { Fragment, useEffect } from "react";
import { fetchAllProductsAsync } from "../store/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton, Typography } from "@mui/material";

function ProductsList() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [products]);

  const renderedProductsList = products.map((product) => {
    return (
      <div className="productsList" key={product.id}>
        <Link to={`/products/${product.id}`}>
          <img className="productsImg" src={product.imageUrl} />
          <h3>{product.title}</h3>
          <h3>${product.price}</h3>
        </Link>
        <IconButton size="small" color="primary edge=" start aria-label="label">
          <AddShoppingCartIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Add to cart
          </Typography>
        </IconButton>
      </div>
    );
  });
  return <Fragment>{renderedProductsList}</Fragment>;
}

export default ProductsList;
