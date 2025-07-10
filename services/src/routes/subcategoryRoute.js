const express = require('express');
const authToken = require('../middleware/authenticate');
const roles = require('../middleware/role');
const { validReq } = require('../middleware/validate');
const { subcategory_validate } = require('../validate');
const subcategory = require('../controller/subcategoryController');

const router = express.Router();
router.post(
  '/new',
  validReq(subcategory_validate),
  authToken,
  roles('customer'),
  subcategory.createSubcategory,
);
router.get('/list', authToken, roles('customer'), subcategory.getSubcategories);
router.get('/:id', authToken, roles('customer'), subcategory.getSubcategory);
router.post(
  '/update-status',
  authToken,
  roles('customer'),
  subcategory.updateSubcategoryActiveStatus,
);

module.exports = router;
