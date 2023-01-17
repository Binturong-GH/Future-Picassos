import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchOneProductAsync } from "../store/slices/singleProductSlice";
import { selectCart, addToCart } from "../store/slices/cartSlice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  IconButton,
  Typography,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";

function SingleProduct() {
  const dispatch = useDispatch();
  const { isLoading, product, error } = useSelector((state) => state.product);
  const { cartItems } = useSelector(selectCart);
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchOneProductAsync(productId));
  }, []);

  if (isLoading) {
    return (
      <Backdrop
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (!isLoading && error) {
    return (
      <>
        <Alert severity="error">{error}</Alert>
        <Typography>
          <Link to={"/products"}>Go back to see other products</Link>
        </Typography>
      </>
    );
  }

  return (
    <div>
      <img alt="product image" src={product.imageUrl} />
      <h3>{product.title}</h3>
      <h3>Artist: {product.artistName}</h3>

      <h4>Description: {product.description} </h4>
      <p>${product.price}</p>
      <IconButton
        onClick={() => {
          dispatch(addToCart(product));
        }}
        size="small"
        color="primary edge="
        start
        aria-label="label"
      >
        <AddShoppingCartIcon />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Add to cart
        </Typography>
      </IconButton>
      <div></div>
    </div>
  );
}

export default SingleProduct;
