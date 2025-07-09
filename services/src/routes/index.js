const express = require('express');
const router = express.Router();

router.use('/auth', require('./admin/auth_route'));

module.exports = {
  root_api_router: router,
};
