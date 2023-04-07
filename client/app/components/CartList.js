import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCart,
  deleteProduct,
  incrementOne,
  subtractOne,
  deleteFromCartDB,
  editCartDB,
  setLocalCart,
} from "../store/slices/cartSlice";

// MUI
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
// MUI Icon
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const styles = {
  table__head: {
    fontSize: 20,
    fontWeight: "bold",
  },
  hide: {
    display: {
      xs: "none",
      md: "table-cell",
    },
  },
  quantity__button: {
    color: "black",
  },
};

const CartList = ({ cartItems }) => {
  const dispatch = useDispatch();

  function handleSubtract(cartItem) {
    dispatch(subtractOne(cartItem.id));
    const req = {
      productId: cartItem.id,
      quantity: cartItem.quantity - 1,
    };
    if (user) {
      dispatch(editCartDB(req));
    } else {
      dispatch(setLocalCart(cartItems));
    }
  }

  function handleIncrement(cartItem) {
    dispatch(incrementOne(cartItem.id));
    const req = {
      productId: cartItem.id,
      quantity: cartItem.quantity + 1,
    };
    if (user) {
      dispatch(editCartDB(req));
    } else {
      dispatch(setLocalCart(cartItems));
    }
  }

  function handleDelete(cartItem) {
    dispatch(deleteProduct(cartItem.id));
    if (user) {
      dispatch(deleteFromCartDB(cartItem));
    } else {
      dispatch(setLocalCart(cartItems));
    }
  }

  return (
    <Fragment>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ fontSize: 20, fontWeight: "bold" }}
              >
                Item
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: 20,
                  fontWeight: "bold",
                  display: {
                    xs: "none",
                    md: "table-cell",
                  },
                }}
              >
                Title
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: 20,
                  fontWeight: "bold",
                  display: {
                    xs: "none",
                    md: "table-cell",
                  },
                }}
              >
                Price
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: 20, fontWeight: "bold" }}
              >
                Quantity
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: 20,
                  fontWeight: "bold",
                  display: {
                    xs: "none",
                    md: "table-cell",
                  },
                }}
              >
                Subtotal
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => {
              return (
                <TableRow key={item.id}>
                  {/* Item's image */}
                  <TableCell align="center">
                    <Box
                      component="img"
                      sx={{
                        maxWidth: 100,
                        maxHeight: 80,
                      }}
                      src={item.imageUrl}
                      alt={item.title}
                    />
                  </TableCell>
                  {/* Title */}
                  <TableCell align="center" sx={styles.hide}>
                    {item.title}
                  </TableCell>
                  {/* Price */}
                  <TableCell align="center" sx={styles.hide}>
                    $ {item.price}
                  </TableCell>
                  {/* Quantity */}
                  <TableCell align="center">
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        onClick={() => {
                          handleIncrement(item);
                        }}
                        sx={styles.quantity__button}
                        style={{
                          maxWidth: "28px",
                          maxHeight: "28px",
                          minWidth: "28px",
                          minHeight: "28px",
                        }}
                      >
                        <AddIcon />
                      </Button>
                      <Typography>{item.quantity}</Typography>
                      <Button
                        onClick={() => handleSubtract(item)}
                        sx={styles.quantity__button}
                        style={{
                          maxWidth: "28px",
                          maxHeight: "28px",
                          minWidth: "28px",
                          minHeight: "28px",
                        }}
                      >
                        <RemoveIcon />
                      </Button>
                    </Stack>
                  </TableCell>
                  {/* Subtotal */}
                  <TableCell align="center" sx={styles.hide}>
                    {item.quantity * item.price}
                  </TableCell>
                  {/* Delete */}
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(item)}
                      variant="contained"
                      color="error"
                      sx={{
                        p: 0,
                      }}
                      style={{
                        maxWidth: "28px",
                        maxHeight: "28px",
                        minWidth: "28px",
                        minHeight: "28px",
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default CartList;
