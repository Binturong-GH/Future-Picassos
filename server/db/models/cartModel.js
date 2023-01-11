const Sequelize = require('sequelize');
const db = require('./db');
const Product = require('./productModel');
const User = require('./userModel');

const Cart = db.define('cart', {
  userId: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: 'id',
    },
  },
  productId: {
    type: Sequelize.STRING,
    references: {
      model: Product,
      key: 'id',
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
});

module.exports = Cart;
