//cart list component, could reuse this on checkout page?

import React from 'react';

const CartList = () => {
  return (
    <div>
      <p>
        this will be a table of products, with the following: - thumbnail image
        of product - product name - price (individual item) - quantity, with "-"
        and "+" to adjust - subtotal (price * quantity) - delete icon
      </p>
    </div>
  );
};

export default CartList;
