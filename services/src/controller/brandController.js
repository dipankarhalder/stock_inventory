const { StatusCodes } = require('http-status-codes');
const Brand = require('../models/brandModel');
const { core, userUtils } = require('../utils');

/* 
  @service - brand create,
  @method - POST,
*/
exports.createBrand = async (req, res) => {
  try {
    const { name, code, desc } = req.body;
    const user = req.user;

    const roleCheckError = userUtils.checkUserRole(
      user,
      ['customer'],
      res,
      'Only customers are allowed to create brand.',
    );
    if (roleCheckError) return roleCheckError;

    const existingInfo = await Brand.findOne({ $or: [{ name }, { code }] });
    if (existingInfo) {
      const message =
        existingInfo.code === code
          ? 'The code you entered is already associated with a brand.'
          : 'The name you entered is already associated with a brand .';
      return core.validateFields(res, message);
    }

    const newBrand = new Brand({
      name,
      code,
      desc,
      createBy: user.id,
      updatedBy: user.id,
    });

    await newBrand.save();
    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      data: newBrand,
      message: 'New brand created successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* 
  @service - brands list,
  @method - GET,
*/
exports.getBrands = async (req, res) => {
  try {
    const user = req.user;
    const roleCheckError = userUtils.checkUserRole(user, ['customer'], res);
    if (roleCheckError) return roleCheckError;

    const brands = await Brand.find({ createBy: user.id })
      .populate('createBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'All the brands listed successfully.',
      data: brands,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* 
  @service - brand details,
  @method - GET,
*/
exports.getBrand = async (req, res) => {
  try {
    const id = req.params.id;
    if (!userUtils.isValidObjectId(id, res, 'Brand ID')) return;

    const brandInfo = await Brand.findById(id)
      .populate('createBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
    if (!brandInfo) {
      return core.notFoundItem(res, 'Brand not found.');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: brandInfo,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
  @service - brand status,
  @method - POST,
*/
exports.updateBrandActiveStatus = async (req, res) => {
  try {
    const { brandId, isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      return core.validateFields(res, 'Invalid isActive value.');
    }

    const brandInfo = await Brand.findById(brandId);
    if (!brandInfo) {
      return core.validateFields(res, 'Brand not found.');
    }

    brandInfo.isActive = isActive;
    brandInfo.updatedBy = req.user.id;
    await brandInfo.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: `Brand '${brandInfo.name}' has been ${isActive ? 'activated' : 'deactivated'} successfully.`,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};
