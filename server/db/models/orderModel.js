const Sequelize = require("sequelize");
const { date } = require("yup");
const db = require("../db");

const Order = db.define("order", {
  orderItems: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    defaultValue: [],
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  paymentMethod: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "visa",
  },
  itemsPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  taxPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  shippingPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  isPaid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  paidAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Date.now(),
  },
  isDelivered: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  deliveredAt: {
    type: Sequelize.DATE,
  },
});

module.exports = Order;
