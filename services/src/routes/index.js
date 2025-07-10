const express = require('express');
const router = express.Router();

router.use('/auth', require('./admin/authRoute'));
router.use('/profile', require('./admin/profileRoute'));

module.exports = {
  root_api_router: router,
};
