const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoute'));
router.use('/profile', require('./profileRoute'));
router.use('/warehouse', require('./warehouseRoute'));
router.use('/shop', require('./shopRoute'));

module.exports = {
  root_api_router: router,
};
