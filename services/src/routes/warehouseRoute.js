const express = require('express');
const authToken = require('../middleware/authenticate');
const roles = require('../middleware/role');
const warehouse = require('../controller/warehouseController');

const router = express.Router();
router.post('/new', authToken, roles('customer'), warehouse.createWarehouse);
router.get('/list', authToken, roles('customer'), warehouse.getWarehouses);
router.get('/:id', authToken, roles('customer'), warehouse.getWarehouse);
router.post(
  '/update-status',
  authToken,
  roles('customer'),
  warehouse.updateWarehouseActiveStatus,
);

module.exports = router;
