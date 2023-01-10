//this is the access point for all things database related!

const db = require("./db");

const templateUser = require("./models/User");
const User = require("./models/userModel");

//associations could go here!

module.exports = {
  db,
  models: {
    templateUser,
    User,
  },
};
