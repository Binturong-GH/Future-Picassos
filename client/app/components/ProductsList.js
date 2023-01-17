import React, { Fragment, useEffect, useState } from "react";
import { fetchAllProductsAsync } from "../store/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  IconButton,
  Typography,
  Pagination,
  Stack,
  Backdrop,
  CircularProgress,
} from "@mui/material";

//pagination
import paginate from "../utils/paginate";

function ProductsList() {
  const dispatch = useDispatch();
  const { isLoading, products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
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
    return (
      <div className="productsList" key={product.id}>
        <Link to={`/products/${product.id}`}>
          <img className="productsImg" src={product.imageUrl} />
          <h3>{product.title}</h3>
          <h3>${product.price}</h3>
        </Link>
        <IconButton
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
      </div>
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
  return (
    <Fragment>
      {renderedProductsList}
      <Stack spacing={2}>
        <Pagination
          count={paginate(products).length}
          page={page + 1}
          onChange={handlePageChange}
        />
      </Stack>
    </Fragment>
  );
}

export default ProductsList;
