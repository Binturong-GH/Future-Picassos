import React, { Fragment, useEffect, useState } from "react";
import { fetchAllProductsAsync } from "../store/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  IconButton,
  Typography,
  Grid,
  Box,
  Pagination,
  Stack,
  Backdrop,
  CircularProgress,
  Alert,
} from "@mui/material";

//pagination
import paginate from "../utils/paginate";

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
  const { products, isLoading, error } = useSelector((state) => state.products);
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

  //pagination
  const [page, setPage] = useState(
    localStorage.getItem("currentPageAtAllProducts")
      ? Number(localStorage.getItem("currentPageAtAllProducts"))
      : 0
  );

  const [productsPerPage, setProductsPerPage] = useState([]);
  const handlePageChange = (event, value) => {
    localStorage.setItem("currentPageAtAllProducts", value - 1);
    setPage(value - 1);
  };

  useEffect(() => {
    if (isLoading) return;
    if (!isLoading && products.length > 0) {
      setProductsPerPage(paginate(products)[page]);
    }
  }, [isLoading, products, page]);

  const renderedProductsList = productsPerPage.map((product) => {
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
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 200, md: 233 },
                maxWidth: { xs: 220, md: 250, lg: 300 },
              }}
              alt={product.title}
              src={product.imageUrl}
            />

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
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Fragment>
      <Box sx={{ flexGrow: 1, my: 6, mx: 4 }}>
        <Grid
          container
          spacing={{ xs: 4, md: 6, lg: 8 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {renderedProductsList}
        </Grid>
      </Box>
      <Stack spacing={2}>
        <Pagination
          sx={{ mx: "auto" }}
          count={paginate(products).length}
          page={page + 1}
          onChange={handlePageChange}
        />
      </Stack>
    </Fragment>
  );
}

export default ProductsList;
