import React from "react";

// router
import { Navigate } from "react-router-dom";

// components
import ItemsForPayment from "../components/ItemsForPayment";
import OrderDetail from "../components/OrderDetail";

// Redux
import { useSelector } from "react-redux";

// MUI
import Typography from "@mui/material/Typography";

export default function OrderDetailPage() {
  const { order } = useSelector((state) => state.order);

  if (!order) {
    return <Navigate to="/cart" />;
  }

  return (
    <div>
      <Typography variant="h3" sx={{ m: 4 }}>
        Order Detail
      </Typography>
      <ItemsForPayment
        cartItems={order.orderItems.map((item) => {
          item = JSON.parse(item);
          return {
            id: item.id,
            imageUrl: item.imageUrl,
            quantity: item.quantity,
            price: item.subtotal / item.quantity,
          };
        })}
        subtotal={order.itemsPrice}
        tax={order.taxPrice}
        shipping={order.shippingPrice}
        total={order.totalPrice}
      />
      <OrderDetail shippingAddress={order.shippingAddress} />
    </div>
  );
}
