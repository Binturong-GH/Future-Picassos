import React, { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsAsync } from "../store";

// MUI
import { Box, Grid, Stack, Pagination } from "@mui/material";

// Component
import { ProductItem, LoadingSpinner } from "../components";

const AllProductsPage = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);

  // fetch all products
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Grid container spacing={4} sx={{ mx: "auto", p: 4 }}>
        {products.length &&
          products.map((item) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <ProductItem product={item} />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default AllProductsPage;
