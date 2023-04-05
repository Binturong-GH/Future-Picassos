//cart list component, could reuse this on checkout page?

import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCart,
  fetchUserCart,
  deleteProduct,
  incrementOne,
  subtractOne,
  deleteFromCartDB,
  editCartDB,
  getLocalCart,
  setLocalCart,
} from "../store/slices/cartSlice";

// MUI
import Container from "@mui/material/Container";
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

const CartList = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(selectCart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserCart());
    } else {
      console.log("cartlist useeffect - not user, dispatching getlocalcart");
      dispatch(getLocalCart());
    }
  }, []);

  const cartRows = cartItems.map((cartItem) => {
    function handleSubtract() {
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

    function handleIncrement() {
      console.log("cartItem", cartItem);
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
    return (
      <tr key={cartItem.id}>
        <td>{cartItem.title}</td>
        <td>${cartItem.price}</td>
        <td>
          <button onClick={handleSubtract}>subtract one</button>
        </td>
        <td>{cartItem.quantity}</td>
        <td>
          <button onClick={handleIncrement}>add one</button>
        </td>
        <td>{cartItem.quantity * cartItem.price}</td>
        <td>
          <button
            onClick={() => {
              dispatch(deleteProduct(cartItem.id));
              if (user) {
                dispatch(deleteFromCartDB(cartItem));
              } else {
                dispatch(setLocalCart(cartItems));
              }
            }}
          >
            Remove from Cart
          </button>
        </td>
      </tr>
    );
  });

  return (
    <Fragment>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={styles.table__head}>
                  Item
                </TableCell>
                <TableCell
                  align="center"
                  sx={(styles.hide, styles.table__head)}
                >
                  Title
                </TableCell>
                <TableCell
                  align="center"
                  sx={(styles.hide, styles.table__head)}
                >
                  Price
                </TableCell>
                <TableCell align="center" sx={styles.table__head}>
                  Quantity
                </TableCell>
                <TableCell
                  align="center"
                  sx={(styles.hide, styles.table__head)}
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
                    <TableCell align="center" sx={styles.hide}>
                      {item.title}
                    </TableCell>
                    <TableCell align="center" sx={styles.hide}>
                      $ {item.price}
                    </TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Button
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
                    <TableCell align="center" sx={styles.hide}>
                      {item.quantity * item.price}
                    </TableCell>
                    <TableCell>
                      <Button
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
      </Container>
    </Fragment>
  );
};

export default CartList;

/**
   <div>
      <div>
        {cartItems && cartItems.length ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th> </th>
                <th>Quantity</th>
                <th> </th>
                <th>Total</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{cartRows}</tbody>
          </table>
        ) : (
          <p>Your cart is currently empty - start shopping!</p>
        )}
      </div>
    </div>


 */
