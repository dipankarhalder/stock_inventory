const express = require('express');
const authToken = require('../middleware/authenticate');
const roles = require('../middleware/role');
const { validReq } = require('../middleware/validate');
const { brand_validate } = require('../validate');
const attribute = require('../controller/attributeController');

const router = express.Router();
router.post(
  '/new',
  validReq(brand_validate),
  authToken,
  roles('customer'),
  attribute.createAttribute,
);
router.get('/list', authToken, roles('customer'), attribute.getAttributes);
router.get('/:id', authToken, roles('customer'), attribute.getAttribute);
router.post(
  '/update-status',
  authToken,
  roles('customer'),
  attribute.updateAttributeActiveStatus,
);

module.exports = router;
