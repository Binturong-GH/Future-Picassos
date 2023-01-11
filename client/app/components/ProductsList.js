import React, { Fragment, useEffect } from "react";
import { fetchAllProductsAsync } from "../store/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProductsList() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  console.log(products);
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, []);

  const renderedProductsList = products.map((product) => {
    return (
      <div className="productsList" key={product.id}>
        <Link to={`/products/${product.id}`}>
          <img className="productsImg" src={product.imageUrl} />
          <h3>{product.title}</h3>
          <h4>${product.price}</h4>
        </Link>
      </div>
    );
  });
  return <Fragment>{renderedProductsList}Hello</Fragment>;
}

export default ProductsList;
