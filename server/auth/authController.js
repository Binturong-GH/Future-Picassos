const asyncHandler = require('express-async-handler');
const {
  models: { User },
} = require('../db');

// @desc: Create new user
// @route: POST /auth/signup
// @access: Private
const signup = asyncHandler(async (req, res, next) => {
  // 1. create user
  const { name, email, password, passwordConfirm } = req.body;
  if (!name || !email || !password || !passwordConfirm) {
    const error = new Error(
      'Name, email, password, passwordConfirm  are required.'
    );
    error.status = 400;
    throw error;
  }

  // check if user with this email already exist
  const existUser = await User.findOne({ where: { email } });
  if (existUser) {
    const error = new Error('User already exists.');
    error.status = 401;
    throw error;
  }

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });
  // 2. create token
  const token = newUser.generateToken();

  // 3. send token back to client
  res.status(201).json({
    status: 'success',
    token,
  });
});

// @desc: Login user
// @route: POST /auth/login
// @access: Private
const login = asyncHandler(async (req, res, next) => {
  // 1. read email , password from req.body
  const { email, password } = req.body;
  // 2. check if email, password exist
  if (!email || !password) {
    const error = new Error('Please provide email and password!');
    error.status = 400;
    throw error;
  }
  // 3. fing user by email
  const user = await User.findOne({
    where: {
      email,
    },
  });
  // 4. Check if user exists && password is correct
  if (!user || !(await user.correctPassword(password))) {
    const error = new Error('Incorrect email or password');
    error.status = 401;
    throw error;
  }

  // 5. if everything is ok, return token & user info
  const token = user.generateToken();

  res.status(200).json({
    status: 'success',
    token,
  });
});

// @desc: Check user is login before accessing private resources
// @route: -
// @access: Private
const protect = asyncHandler(async (req, res, next) => {
  //  1) get token from header, check token is exist inside req.headers
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    const error = new Error(
      'You are not logged in! Please log in to get access.'
    );
    error.status = 401;
    throw error;
  }
  //  2) valification token, check if token is valid , auto throw error when verify is wrong
  const decode = await User.verifyToken(token);
  //  3) find user by decode token , get the id to find user
  const currentUser = await User.findByPk(decode.id);
  //  4) check if user still exists
  if (!currentUser) {
    const error = new Error(
      'The user belonging to this token does no longer exist.'
    );
    error.status = 401;
    throw error;
  }

  //  5) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decode.iat)) {
    const error = new Error(
      'User recently changed password! Please log in again'
    );
    error.status = 401;
    throw error;
  }

  //  6) Grant access to protected Route
  req.user = currentUser;
  req.user.passwordConfirm = undefined;
  next();
});

module.exports = {
  signup,
  login,
  protect,
};
