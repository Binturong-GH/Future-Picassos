const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://cdn.britannica.com/24/189624-050-F3C5BAA9/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg?w=300&h=169&c=crop",
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  artistName: {
    type: Sequelize.STRING,
  },
  age: {
    type: Sequelize.INTEGER,
  },
  countInStock: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});
module.exports = Product;
