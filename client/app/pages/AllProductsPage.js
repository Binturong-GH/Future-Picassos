import React, { useEffect, useState } from "react";

// Pagination
import paginate from "../utils/paginate";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsAsync } from "../store";

// MUI
import { Box, Grid, Stack, Pagination } from "@mui/material";

// Component
import { ProductItem, LoadingSpinner, Error } from "../components";

const AllProductsPage = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.products);
  // fetch all products
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, []);

  // pagination
  const [productsPerPage, setProductsPerPage] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (products.length) {
      setProductsPerPage(paginate(products));
    }
  }, [products]);

  // Render based on fetch state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isLoading && error) {
    return <Error error={"show me"} />;
  }

  return (
    <>
      {/* List of Product items */}
      <Grid container spacing={4} sx={{ mx: "auto", p: 4 }}>
        {products.length &&
          productsPerPage.length &&
          productsPerPage[page].map((item) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <ProductItem product={item} />
              </Grid>
            );
          })}
      </Grid>

      {/* Pagination */}
      <Stack>
        <Pagination
          sx={{ mx: "auto" }}
          count={productsPerPage.length}
          page={page + 1}
          onChange={(event, value) => {
            setPage(value - 1);
          }}
        />
      </Stack>
    </>
  );
};

export default AllProductsPage;
