const { StatusCodes } = require('http-status-codes');
const Subcategory = require('../models/subcategoryModel');
const { core, userUtils } = require('../utils');

/* 
  @service - sub category create,
  @method - POST,
*/
exports.createSubcategory = async (req, res) => {
  try {
    const { name, code, desc } = req.body;
    const user = req.user;

    const roleCheckError = userUtils.checkUserRole(
      user,
      ['customer'],
      res,
      'Only customers are allowed to create sub category.',
    );
    if (roleCheckError) return roleCheckError;

    const existingInfo = await Subcategory.findOne({
      $or: [{ name }, { code }],
    });
    if (existingInfo) {
      const message =
        existingInfo.code === code
          ? 'The code you entered is already associated with a sub category.'
          : 'The name you entered is already associated with a sub category .';
      return core.validateFields(res, message);
    }

    const newSubcategory = new Subcategory({
      name,
      code,
      desc,
      createBy: user.id,
      updatedBy: user.id,
    });

    await newSubcategory.save();
    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      data: newSubcategory,
      message: 'New sub category created successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* 
  @service - sub categories list,
  @method - GET,
*/
exports.getSubcategories = async (req, res) => {
  try {
    const user = req.user;
    const roleCheckError = userUtils.checkUserRole(user, ['customer'], res);
    if (roleCheckError) return roleCheckError;

    const subCategories = await Subcategory.find({ createBy: user.id })
      .populate('createBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'All the sub category listed successfully.',
      data: subCategories,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* 
  @service - sub category details,
  @method - GET,
*/
exports.getSubcategory = async (req, res) => {
  try {
    const id = req.params.id;
    if (!userUtils.isValidObjectId(id, res, 'Subcategory ID')) return;

    const subCategoryInfo = await Subcategory.findById(id)
      .populate('createBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
    if (!subCategoryInfo) {
      return core.notFoundItem(res, 'Subcategory not found.');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: subCategoryInfo,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
  @service - sub category status,
  @method - POST,
*/
exports.updateSubcategoryActiveStatus = async (req, res) => {
  try {
    const { subCategoryId, isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      return core.validateFields(res, 'Invalid isActive value.');
    }

    const subCategoryInfo = await Subcategory.findById(subCategoryId);
    if (!subCategoryInfo) {
      return core.validateFields(res, 'Subcategory not found.');
    }

    subCategoryInfo.isActive = isActive;
    subCategoryInfo.updatedBy = req.user.id;
    await subCategoryInfo.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: `Subcategory '${subCategoryInfo.name}' has been ${isActive ? 'activated' : 'deactivated'} successfully.`,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};
