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

  newUser.excludePasswordField();

  // 3. send token back to client
  res.status(201).json({
    status: 'success',
    token,
  });
});

module.exports = {
  signup,
};
