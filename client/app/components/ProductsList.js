import React, { Fragment, useEffect } from "react";
import { fetchAllProductsAsync } from "../store/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton, Typography, Grid, Box } from "@mui/material";
import {
  selectCart,
  addToCart,
  fetchUserCart,
  addToCartDB,
  setLocalCart,
  getLocalCart,
} from "../store/slices/cartSlice";

function ProductsList() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { cartItems } = useSelector(selectCart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, []);
  useEffect(() => {
    if (user) {
      dispatch(fetchUserCart());
    } else {
      dispatch(getLocalCart());
    }
  }, []);

  const renderedProductsList = products.map((product) => {
    function handleAdd() {
      console.log("triggered handleAdd on ProductsList");
      dispatch(addToCart(product));
      console.log("product", product);
      const req = {
        productId: product.id,
        quantity: 1,
      };
      if (user) {
        dispatch(addToCartDB(req));
      } else {
        dispatch(setLocalCart(cartItems));
      }
    }
    return (
      <Grid item xs={2} sm={4} md={4} key={product.id}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            border: 1,
            borderColor: "grey.200",
            borderRadius: 1,
            boxShadow: "2",
            py: 2,
          }}
        >
          <Link to={`/products/${product.id}`}>
            <img className="productsImg" src={product.imageUrl} />
            <h3>{product.title}</h3>
            <h3>${product.price}</h3>
          </Link>
          <IconButton
            onClick={handleAdd}
            size="small"
            color="primary"
            edge="start"
            aria-label="label"
          >
            <AddShoppingCartIcon />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Add to cart
            </Typography>
          </IconButton>
        </Box>
      </Grid>
    );
  });
  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 4, md: 6, lg: 8 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {renderedProductsList}
        </Grid>
      </Box>
    </Fragment>
  );
}

export default ProductsList;
