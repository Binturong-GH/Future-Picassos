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
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { pink } from "@mui/material/colors";
const styles = {
  hide_md: {
    display: {
      xs: "none",
      md: "table-cell",
    },
  },
  hide_sm: {
    display: {
      xs: "none",
      sm: "table-cell",
    },
  },
};

//Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsAsync } from "../store";

// Router
import { useNavigate } from "react-router-dom";

// from utils
import paginate from "../utils/paginate";

// from components
import DeleteProductPrompt from "../components/DeleteProductPrompt";
import EditProduct from "../components/EditProduct";
import CreateProductPrompt from "../components/CreateProductPrompt";

export default function ProductsListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, products, error, errorOfCreate, errorOfEdit } =
    useSelector((state) => state.products);
  const { isLogged } = useSelector((state) => state.auth);

  // pagination
  const [page, setPage] = useState(
    localStorage.getItem("currentPage")
      ? Number(localStorage.getItem("currentPage"))
      : 0
  );
  const [productsPerPage, setProductsPerPage] = useState([]);
  const handlePageChange = (event, value) => {
    localStorage.setItem("currentPage", value - 1);
    setPage(value - 1);
  };
  useEffect(() => {
    if (isLoading) return;
    if (products.length > 0) {
      if (page > Math.ceil(products.length / 12) - 1) {
        localStorage.setItem("currentPage", page - 1);
        setPage((prev) => prev - 1);
      } else {
        setProductsPerPage(paginate(products)[page]);
      }
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

  // handle create product prompt
  const handleCreateProduct = () => {
    setOpenCreateProductPrompt(true);
  };
  const [openCreateProductPrompt, setOpenCreateProductPrompt] = useState(false);

  const handleCreateProductPromptClose = () => {
    setOpenCreateProductPrompt(false);
  };

  // handle edit prompt
  const [productWillBeEdit, setProductWillBeEdit] = useState(null);
  const [openEditProductPrompt, setOpenEditProductPrompt] = useState(false);

  useEffect(() => {
    if (productWillBeEdit !== null) {
      setOpenEditProductPrompt(true);
    }
  }, [productWillBeEdit]);

  const handleEditProduct = (id) => {
    setProductWillBeEdit(id);
  };

  const handleEditProductPromptClose = () => {
    setOpenEditProductPrompt(false);
    setProductWillBeEdit(null);
  };

  // handle delete prompt
  const [productWillBeDeleted, setProductWillBeDeleted] = useState(null);
  const [openDeleteProductPrompt, setOpenDeleteProductPrompt] = useState(false);

  useEffect(() => {
    if (productWillBeDeleted !== null) {
      setOpenDeleteProductPrompt(true);
    }
  }, [productWillBeDeleted]);

  const handleDeleteProduct = (product) => {
    setProductWillBeDeleted(product);
  };

  const handleDeleteProductPromptClose = () => {
    setOpenDeleteProductPrompt(false);
    setProductWillBeDeleted(null);
  };

  // handle loading and error state
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
    <>
      {!isLoading && errorOfCreate && (
        <Alert severity="error">{errorOfCreate}</Alert>
      )}
      {!isLoading && errorOfEdit && (
        <Alert severity="error">{errorOfEdit}</Alert>
      )}

      <>
        {productWillBeDeleted && (
          <DeleteProductPrompt
            handleClose={handleDeleteProductPromptClose}
            open={openDeleteProductPrompt}
            product={productWillBeDeleted}
          />
        )}
        {productWillBeEdit && (
          <EditProduct
            handleClose={handleEditProductPromptClose}
            open={openEditProductPrompt}
            id={productWillBeEdit}
          />
        )}

        <CreateProductPrompt
          handleClose={handleCreateProductPromptClose}
          open={openCreateProductPrompt}
        />
      </>

      <Box sx={{ display: "flex", justifyContent: "space-between", m: 2 }}>
        <Typography variant="h3">Products</Typography>
        <Button variant="contained" onClick={handleCreateProduct} sx={{ p: 1 }}>
          <AddIcon /> <span> Create a new Product</span>
        </Button>
      </Box>

      <Box sx={{ mx: 2 }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, minWidth: 100 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={styles.hide_sm}>
                  Index
                </TableCell>
                <TableCell sx={styles.hide_sm}>ID</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center" sx={styles.hide_sm}>
                  Title
                </TableCell>
                <TableCell align="center" sx={styles.hide_sm}>
                  Price
                </TableCell>
                <TableCell align="center" sx={styles.hide_md}>
                  Count in stock
                </TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsPerPage.map((product, index) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" sx={styles.hide_sm}>
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row" sx={styles.hide_sm}>
                    {product.id}
                  </TableCell>
                  <TableCell align="center" width="10%">
                    <Box
                      component="img"
                      sx={{
                        // height: 133,
                        // width: 150,
                        width: {
                          xs: 80,
                          md: 150,
                        },
                        height: {
                          xs: 80,
                          md: 133,
                        },
                      }}
                      alt={product.title}
                      src={product.imageUrl}
                    />
                  </TableCell>

                  <TableCell align="center" sx={styles.hide_sm}>
                    {product.title}
                  </TableCell>
                  <TableCell align="center" sx={styles.hide_sm}>
                    {product.price}
                  </TableCell>
                  <TableCell align="center" sx={styles.hide_md}>
                    {product.countInStock > 0 ? (
                      product.countInStock
                    ) : (
                      <Typography>Out of stock</Typography>
                    )}
                  </TableCell>

                  <TableCell align="center" width="10%">
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        handleEditProduct(product.id);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>

                  <TableCell align="center" width="10%">
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        handleDeleteProduct(product);
                      }}
                    >
                      <DeleteIcon sx={{ color: pink[500] }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Stack spacing={2}>
        <Pagination
          sx={{ mx: "auto" }}
          count={paginate(products).length}
          page={page + 1}
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
}
