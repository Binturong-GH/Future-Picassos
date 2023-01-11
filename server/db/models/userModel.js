const Sequelize = require('sequelize');
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');

const User = db.define('user', {
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
    type: Sequelize.ENUM('user', 'admin'),
    defaultValue: 'user',
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
        const error = new Error('Passwords are not the same');
        error.status = 400;
        throw error;
      },
    },
  },
  passwordChangedAt: {
    type: Sequelize.DATE,
  },
});

// @desc: hash password only if password is modified
User.addHook('beforeSave', async (user) => {
  if (!user.changed('password')) return;
  user.password = await bcrypt.hash(user.password, 12);
});

// @desc: update passwordChangedAt when update password
User.addHook('beforeSave', (user) => {
  if (!user.changed('password') || user.isNewRecord) return;
  user.passwordChangedAt = Date.now() - 1000;
});

// @desc: exclude password, passwordConfirm field
User.prototype.excludePasswordField = function () {
  this.password = undefined;
  this.passwordConfirm = undefined;
  this.passwordChangedAt = undefined;
  return this;
};

// @desc: generate jwt token
User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, keys.JWT_SECRET, {
    expiresIn: keys.JWT_EXPIRES,
  });
};

// @desc: check if user entered password === password in db
User.prototype.correctPassword = async function (candidatePwd) {
  return await bcrypt.compare(candidatePwd, this.password);
};

// @desc: find user by token, if user don't exist, or token is invalid, throw error
User.verfiyToken = async function (token) {
  try {
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    return decode;
  } catch (err) {
    const error = new Error('Invalid Token, Please try to login in again.');
    error.status = 401;
    throw error;
  }
};

// @desc: check if token was issued after password changed
User.prototype.changedPasswordAfter = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jwtTimestamp < changedTimestamp;
  }
  return false;
};

module.exports = User;
