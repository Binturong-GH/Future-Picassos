import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchOneProductAsync } from "../store/slices/singleProductSlice";
import {
  selectCart,
  addToCart,
  fetchUserCart,
  addToCartDB,
  setLocalCart,
  getLocalCart,
} from "../store/slices/cartSlice";

// MUI
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton, Alert, Backdrop, CircularProgress } from "@mui/material";

const styles = {
  container: {
    pt: 1,
    pb: 4,
  },
  flexContainer: {
    display: "flex",
    flexDirection: {
      md: "row",
      sm: "column",
      xs: "column",
    },
    justifyContent: "space-evenly",
  },
  imageContainer: {
    width: {
      md: "50%",
      sm: "30%",
      xs: "30%",
    },
    mx: "auto",
  },
  inforContainer: {
    width: {
      md: "50%",
      sm: "100%",
    },
    pl: {
      md: 8,
      sm: 0,
      xs: 0,
    },
    pt: {
      md: 0,
      sm: 8,
      xs: 4,
    },
    display: "flex",
    flexDirection: "column",
  },
  spaceY: {
    mb: 2,
  },
};

function SingleProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, product, error } = useSelector((state) => state.product);
  const { cartItems } = useSelector(selectCart);
  const { productId } = useParams();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchOneProductAsync(productId));
  }, []);

  useEffect(() => {
    console.dir(user);
    if (user) {
      dispatch(fetchUserCart());
    } else {
      dispatch(getLocalCart());
    }
  }, []);

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
    return (
      <>
        <Alert severity="error">{error}</Alert>
        <Typography>
          <Link to={"/products"}>Go back to see other products</Link>
        </Typography>
      </>
    );
  }

  function handleAdd() {
    dispatch(addToCart(product));
    const req = {
      productId: productId,
      quantity: 1,
    };
    if (user) {
      dispatch(addToCartDB(req));
    } else {
      dispatch(setLocalCart(cartItems));
    }
  }

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Button
        variant="contained"
        sx={{ my: 4 }}
        onClick={() => {
          navigate("/products");
        }}
      >
        back to Art
      </Button>
      <Box sx={styles.flexContainer}>
        {/* Image */}
        <Box sx={styles.imageContainer}>
          <ImageListItem key={product.id}>
            <img
              src={product.imageUrl}
              srcSet={product.imageUrl}
              alt={product.title}
              loading="lazy"
            />
          </ImageListItem>
        </Box>
        {/* Product detail */}
        <Box sx={styles.inforContainer}>
          <Typography variant="h4" sx={styles.spaceY}>
            Title: {product.title}
          </Typography>
          <Typography variant="h6" sx={styles.spaceY}>
            Artist: {product.artistName}
          </Typography>
          <Typography variant="h6" sx={styles.spaceY}>
            ${product.price}
          </Typography>
          <Typography variant="h6" sx={styles.spaceY}>
            Description:
          </Typography>
          <Typography variant="body1" sx={styles.spaceY}>
            {product.description}{" "}
          </Typography>

          {/* CTA: Add to Cart */}
          <Button variant="contained" onClick={handleAdd}>
            Add to cart
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SingleProduct;
/*
<div>
<img alt="product image" src={product.imageUrl} />
<h3>{product.title}</h3>
<h3>Artist: {product.artistName}</h3>

<h4>Description: {product.description} </h4>
<p>${product.price}</p>
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
<div></div>
</div>
*/
