const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoute'));
router.use('/profile', require('./profileRoute'));

module.exports = {
  root_api_router: router,
};
