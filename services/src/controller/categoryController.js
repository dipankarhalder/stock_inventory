const { StatusCodes } = require('http-status-codes');
const Category = require('../models/categoryModel');
const { core, userUtils } = require('../utils');

/* 
  @service - category create,
  @method - POST,
*/
exports.createCategory = async (req, res) => {
  try {
    const { name, code, desc } = req.body;
    const user = req.user;

    const roleCheckError = userUtils.checkUserRole(
      user,
      ['customer'],
      res,
      'Only customers are allowed to create category.',
    );
    if (roleCheckError) return roleCheckError;

    const existingInfo = await Category.findOne({ $or: [{ name }, { code }] });
    if (existingInfo) {
      const message =
        existingInfo.code === code
          ? 'The code you entered is already associated with a category.'
          : 'The name you entered is already associated with a category .';
      return core.validateFields(res, message);
    }

    const newCategory = new Category({
      name,
      code,
      desc,
      createBy: user.id,
      updatedBy: user.id,
    });

    await newCategory.save();
    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      data: newCategory,
      message: 'New category created successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* 
  @service - categories list,
  @method - GET,
*/
exports.getCategories = async (req, res) => {
  try {
    const user = req.user;
    const roleCheckError = userUtils.checkUserRole(user, ['customer'], res);
    if (roleCheckError) return roleCheckError;

    const categories = await Category.find({ createBy: user.id })
      .populate('createBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'All the category listed successfully.',
      data: categories,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* 
  @service - Category details,
  @method - GET,
*/
exports.getCategory = async (req, res) => {
  try {
    const id = req.params.id;
    if (!userUtils.isValidObjectId(id, res, 'Category ID')) return;

    const categoryInfo = await Category.findById(id)
      .populate('createBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
    if (!categoryInfo) {
      return core.notFoundItem(res, 'Category not found.');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: categoryInfo,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
  @service - Category status,
  @method - POST,
*/
exports.updateCategoryActiveStatus = async (req, res) => {
  try {
    const { categoryId, isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      return core.validateFields(res, 'Invalid isActive value.');
    }

    const categoryInfo = await Category.findById(categoryId);
    if (!categoryInfo) {
      return core.validateFields(res, 'Category not found.');
    }

    categoryInfo.isActive = isActive;
    categoryInfo.updatedBy = req.user.id;
    await categoryInfo.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: `Category '${categoryInfo.name}' has been ${isActive ? 'activated' : 'deactivated'} successfully.`,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};
