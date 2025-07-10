const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoute'));
router.use('/profile', require('./profileRoute'));
router.use('/warehouse', require('./warehouseRoute'));
router.use('/shop', require('./shopRoute'));
router.use('/category', require('./categoryRoute'));
router.use('/sub-category', require('./subcategoryRoute'));
router.use('/brand', require('./brandRoute'));
router.use('/attribute', require('./attributeRoute'));

module.exports = {
  root_api_router: router,
};
