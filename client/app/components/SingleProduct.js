import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOneProductAsync } from "../store/slices/singleProductSlice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton, Typography} from "@mui/material";


function SingleProduct() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { cartItems } = useSelector(selectCart);
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchOneProductAsync(productId));
  }, []);

  return (
    <div>
      <img alt='product image' src={product.imageUrl} />
      <h3>{product.title}</h3>
      <h3>Artist: {product.artistName}</h3>

      <h4>Description: {product.description} </h4>
      <p>
         ${product.price}
      </p>
      <IconButton  onClick={() => {
          dispatch(addToCart(product));
        } size="small" color="primary edge=" start aria-label="label">
          <AddShoppingCartIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Add to cart
          </Typography>
          </IconButton>
      <div></div>
    </div>
  );
}

export default SingleProduct;
