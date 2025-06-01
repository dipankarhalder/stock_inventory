const { StatusCodes } = require('http-status-codes');
const Category = require('../models/category.model');
const { msg } = require('../constant');
const { core, userVal } = require('../utils');

/* create category */
const createCategory = async (req, res) => {
  try {
    const decoded = req.user;

    const user = await userVal.getUserOrRespondNotFound(decoded.id, res);
    if (!user) return;

    const userInfo = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    const { categoryName, categoryCode, status } = req.body;
    const existingCategory = await Category.findOne({ categoryName });
    if (existingCategory) {
      return core.validateFields(res, msg.category.categoryAlreadyExist);
    }

    const newCategory = new Category({
      categoryName,
      categoryCode,
      status,
      user: userInfo,
    });

    await newCategory.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      category: newCategory,
      message: msg.category.newCategoryCreated,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* list of categories */
const listCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: categories,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* get category */
const getCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryDetails = await Category.findById(categoryId);
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      details: categoryDetails,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* delete category */
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findById(categoryId);
    if (!category) {
      return core.notFoundItem(res, msg.category.categoryNotFound);
    }

    await Category.findByIdAndDelete(categoryId);
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: msg.category.categoryDeleted,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

module.exports = {
  createCategory,
  listCategories,
  getCategory,
  deleteCategory,
};
