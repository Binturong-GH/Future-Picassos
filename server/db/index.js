//this is the access point for all things database related!

const db = require('./db');

const templateUser = require('./models/User');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const Cart = require('./models/cartModel');

//associations could go here!
Product.belongsToMany(User, { through: Cart });
User.belongsToMany(Product, { through: Cart });

User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
  db,
  models: {
    templateUser,
    User,
    Product,
    Order,
    Cart,
  },
};
