const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  role: {
    type: Sequelize.ENUM("user", "admin"),
    defaultValue: "user",
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  passwordConfirm: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      confirmPassword(value) {
        if (value === this.password) return;
        const error = new Error("Passwords are not the same");
        error.status = 400;
        throw error;
      },
    },
  },
});

module.exports = User;
