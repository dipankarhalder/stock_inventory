const express = require('express');
const authToken = require('../middleware/authenticate');
const roles = require('../middleware/role');
const { validReq } = require('../middleware/validate');
const { category_validate } = require('../validate');
const category = require('../controller/categoryController');

const router = express.Router();
router.post(
  '/new',
  validReq(category_validate),
  authToken,
  roles('customer'),
  category.createCategory,
);
router.get('/list', authToken, roles('customer'), category.getCategories);
router.get('/:id', authToken, roles('customer'), category.getCategory);
router.post(
  '/update-status',
  authToken,
  roles('customer'),
  category.updateCategoryActiveStatus,
);

module.exports = router;
