import React, { useEffect, useState } from "react";
// MUI
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Icon,
  Backdrop,
  CircularProgress,
  Alert,
  IconButton,
  Box,
  Pagination,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsAsync } from "../store";

// Router
import { useNavigate } from "react-router-dom";

// from utils
import paginate from "../utils/paginate";

export default function ProductsListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, products, error } = useSelector((state) => state.products);
  const { isLogged } = useSelector((state) => state.auth);

  // pagination
  const [page, setPage] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState([]);
  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };
  useEffect(() => {
    if (isLoading) return;
    if (products.length > 0) {
      setProductsPerPage(paginate(products)[page]);
    }
  }, [isLoading, products, page]);

  // check if user is logged and user is an admin
  useEffect(() => {
    if (
      !(
        localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user")).role === "admin"
      )
    ) {
      navigate("/");
    } else {
      dispatch(fetchAllProductsAsync());
    }
  }, [isLogged]);

  return (
    <>
      <Typography variant="h3">Products</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Index</TableCell>
              <TableCell>ID</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Count in stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsPerPage.map((product, index) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell align="center">
                  <Box
                    component="img"
                    sx={{
                      height: 133,
                      width: 150,
                    }}
                    alt={product.title}
                    src={product.imageUrl}
                  />
                </TableCell>

                <TableCell align="right">{product.title}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">
                  {product.countInStock > 0 ? (
                    product.countInStock
                  ) : (
                    <Typography>Out of stock</Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2}>
        <Pagination
          count={productsPerPage.length}
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
}
