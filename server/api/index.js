const router = require('express').Router();
module.exports = router;

router.use('/users', require('./userRouter'));

router.use('/products', require('./productRouter'));

router.use('/cart', require('./cartRouter'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
