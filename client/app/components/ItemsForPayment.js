import React from "react";

// MUI
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ItemsForPayment = ({ cartItems, subtotal, shipping, tax, total }) => {
  return (
    <Box
      sx={{
        m: 4,
        width: {
          md: 250,
        },
        border: 1,
        borderColor: "grey.500",
        p: 2,
      }}
    >
      {/* Part1: items */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Items</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => {
              return (
                <TableRow key={item.id} sx={{ "& td": { border: 0 } }}>
                  <TableCell align="center">
                    <Box
                      component="img"
                      sx={{
                        width: {
                          xs: 100,
                          md: 50,
                        },
                        heigth: {
                          sx: 80,
                          md: 40,
                        },
                      }}
                      src={item.imageUrl}
                      alt={item.title}
                    />
                  </TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">
                    $ {item.quantity * item.price}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider sx={{ my: 2 }} />
      {/* Part2: Price  */}
      <Box>
        {/* Subtotal */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography sx={{ fontWeight: "bold", fontSize: 24 }}>
            Subtotal:
          </Typography>
          <div>$ {subtotal}</div>
        </Stack>
        {/* Shipping */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography sx={{ fontWeight: "regular", fontSize: 20 }}>
            Shipping Fee:
          </Typography>
          <div>$ {shipping}</div>
        </Stack>
        {/* Tax */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography sx={{ fontWeight: "regular", fontSize: 20 }}>
            tax:
          </Typography>
          <div>$ {tax}</div>
        </Stack>
        <Divider sx={{ my: 2 }} />
        {/* Order total */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", fontSize: 32 }}>
            Total:
          </Typography>
          <div>$ {total}</div>
        </Stack>
      </Box>
    </Box>
  );
};

export default ItemsForPayment;
