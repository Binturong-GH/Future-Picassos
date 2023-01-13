import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOneProductAsync } from '../store/slices/singleProductSlice';
import { addToCart } from '../store';
import { selectCart } from '../store/slices/cartSlice';

function SingleProduct() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { cartItems } = useSelector(selectCart);
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchOneProductAsync(productId));
  }, []);
  console.log('babe, here is cartItems vvv');
  console.dir(cartItems);
  return (
    <div>
      <img alt='product image' src={product.imageUrl} />
      <h3>{product.title}</h3>
      <h3>Artist</h3>
      <p>{product.artistName}</p>
      <h3>Description</h3>
      <p>
        {product.description} ${product.price}
      </p>
      <button
        onClick={() => {
          console.log('click!');
          dispatch(addToCart(product));
        }}
      >
        Add to Cart
      </button>
      <div></div>
    </div>
  );
}

export default SingleProduct;
