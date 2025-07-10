const { StatusCodes } = require('http-status-codes');
const Warehouse = require('../models/warehouseModel');
const { core, userUtils } = require('../utils');

/* 
  @service - warehouse create,
  @method - POST,
*/
exports.createWarehouse = async (req, res) => {
  try {
    const { name, code, address } = req.body;
    const user = req.user;

    const roleCheckError = userUtils.checkUserRole(
      user,
      ['customer'],
      res,
      'Only customers are allowed to create warehouses.',
    );
    if (roleCheckError) return roleCheckError;

    const existingInfo = await Warehouse.findOne({ $or: [{ name }, { code }] });
    if (existingInfo) {
      const message =
        existingInfo.code === code
          ? 'The code you entered is already associated with an warehouse.'
          : 'The name you entered is already associated with an warehouse.';
      return core.validateFields(res, message);
    }

    const newWarehouse = new Warehouse({
      name,
      code,
      address,
      createBy: user.id,
      updatedBy: user.id,
    });

    await newWarehouse.save();
    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      data: newWarehouse,
      message: 'New warehouse created successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* 
  @service - warehouse list,
  @method - GET,
*/
exports.getWarehouses = async (req, res) => {
  try {
    const user = req.user;
    const roleCheckError = userUtils.checkUserRole(user, ['customer'], res);
    if (roleCheckError) return roleCheckError;

    const warehouses = await Warehouse.find({ createBy: user.id })
      .populate('createBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'All the Warehouses listed successfully.',
      data: warehouses,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* 
  @service - warehouse details,
  @method - GET,
*/
exports.getWarehouse = async (req, res) => {
  try {
    const id = req.params.id;
    if (!userUtils.isValidObjectId(id, res, 'Warehouse ID')) return;

    const warehouseInfo = await Warehouse.findById(id)
      .populate('createBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
    if (!warehouseInfo) {
      return core.notFoundItem(res, 'Warehouse not found.');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: warehouseInfo,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
  @service - warehouse status,
  @method - POST,
*/
exports.updateWarehouseActiveStatus = async (req, res) => {
  try {
    const { warehouseId, isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      return core.validateFields(res, 'Invalid isActive value.');
    }

    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
      return core.validateFields(res, 'Warehouse not found.');
    }

    warehouse.isActive = isActive;
    warehouse.updatedBy = req.user.id;
    await warehouse.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: `Warehouse '${warehouse.name}' has been ${isActive ? 'activated' : 'deactivated'} successfully.`,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};
