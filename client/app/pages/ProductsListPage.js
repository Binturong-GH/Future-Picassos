import React, { useEffect } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../store";

// Router
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 2,
    title: "My First Day",
    imageUrl:
      "https://babyology.com.au/wp-content/uploads/2019/02/funny-kids-drawings.jpg",
    price: "350.00",
    countInStock: 20,
  },
  {
    id: 1,
    title: "The Kiss of Sun",
    imageUrl:
      "https://babyolohttps://i.pinimg.com/originals/bb/85/0e/bb850e430413db391cb623b7e522961a.jpggy.com.au/wp-content/uploads/2019/02/funny-kids-drawings.jpg",
    price: "550.00",
    countInStock: 25,
  },
  {
    id: 4,
    title: "In The Playground",
    imageUrl:
      "https://yesofcorsa.com/wp-content/uploads/2019/03/Childrens-Drawings-Wallpaper-For-IPhone-Free.jpg",
    price: "250.00",
    countInStock: 30,
  },
  {
    id: 3,
    title: "Chip And Me",
    imageUrl: "http://www.natureartists.com/art/resized/253_dog_and_boy.jpg",
    price: "750.00",
    countInStock: 35,
  },
  {
    id: 5,
    title: "When I Am ANGRY",
    imageUrl:
      "https://cdn.britannica.com/24/189624-050-F3C5BAA9/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg?w=300&h=169&c=crop",
    price: "300.00",
    countInStock: 0,
  },
];

export default function ProductsListPage() {
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
            {products.map((product, index) => (
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
    </>
  );
}
