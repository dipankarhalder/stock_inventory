const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoute'));
router.use('/profile', require('./profileRoute'));
router.use('/warehouse', require('./warehouseRoute'));

module.exports = {
  root_api_router: router,
};
