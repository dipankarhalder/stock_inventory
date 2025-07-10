const { StatusCodes } = require('http-status-codes');
const Shop = require('../models/shopModel');
const { core, userUtils } = require('../utils');

/* 
  @service - shop create,
  @method - POST,
*/
exports.createShop = async (req, res) => {
  try {
    const { name, code, address } = req.body;
    const user = req.user;

    const roleCheckError = userUtils.checkUserRole(
      user,
      ['customer'],
      res,
      'Only customers are allowed to create shop.',
    );
    if (roleCheckError) return roleCheckError;

    const existingInfo = await Shop.findOne({ $or: [{ name }, { code }] });
    if (existingInfo) {
      const message =
        existingInfo.code === code
          ? 'The code you entered is already associated with an shop.'
          : 'The name you entered is already associated with an shop.';
      return core.validateFields(res, message);
    }

    const newShop = new Shop({
      name,
      code,
      address,
      createBy: user.id,
      updatedBy: user.id,
    });

    await newShop.save();
    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      data: newShop,
      message: 'New shop created successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* 
  @service - shops list,
  @method - GET,
*/
exports.getShops = async (req, res) => {
  try {
    const user = req.user;
    const roleCheckError = userUtils.checkUserRole(user, ['customer'], res);
    if (roleCheckError) return roleCheckError;

    const shops = await Shop.find({ createBy: user.id })
      .populate('createBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'All the shops listed successfully.',
      data: shops,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* 
  @service - shop details,
  @method - GET,
*/
exports.getShop = async (req, res) => {
  try {
    const id = req.params.id;
    if (!userUtils.isValidObjectId(id, res, 'Shop ID')) return;

    const shopInfo = await Shop.findById(id)
      .populate('createBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
    if (!shopInfo) {
      return core.notFoundItem(res, 'Shop not found.');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: shopInfo,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
  @service - shop status,
  @method - POST,
*/
exports.updateShopActiveStatus = async (req, res) => {
  try {
    const { shopId, isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      return core.validateFields(res, 'Invalid isActive value.');
    }

    const shopInfo = await Shop.findById(shopId);
    if (!shopInfo) {
      return core.validateFields(res, 'Shop not found.');
    }

    shopInfo.isActive = isActive;
    shopInfo.updatedBy = req.user.id;
    await shopInfo.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: `Shop '${shopInfo.name}' has been ${isActive ? 'activated' : 'deactivated'} successfully.`,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};
