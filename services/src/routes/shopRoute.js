const express = require('express');
const authToken = require('../middleware/authenticate');
const roles = require('../middleware/role');
const { validReq } = require('../middleware/validate');
const { shop_validate } = require('../validate');
const shops = require('../controller/shopController');

const router = express.Router();
router.post(
  '/new',
  validReq(shop_validate),
  authToken,
  roles('customer'),
  shops.createShop,
);
router.get('/list', authToken, roles('customer'), shops.getShops);
router.get('/:id', authToken, roles('customer'), shops.getShop);
router.post(
  '/update-status',
  authToken,
  roles('customer'),
  shops.updateShopActiveStatus,
);

module.exports = router;
