const express = require('express');
const authToken = require('../middleware/authenticate');
const roles = require('../middleware/role');
const { validReq } = require('../middleware/validate');
const { brand_validate } = require('../validate');
const brands = require('../controller/brandController');

const router = express.Router();
router.post(
  '/new',
  validReq(brand_validate),
  authToken,
  roles('customer'),
  brands.createBrand,
);
router.get('/list', authToken, roles('customer'), brands.getBrands);
router.get('/:id', authToken, roles('customer'), brands.getBrand);
router.post(
  '/update-status',
  authToken,
  roles('customer'),
  brands.updateBrandActiveStatus,
);

module.exports = router;
