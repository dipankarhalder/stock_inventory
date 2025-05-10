const { StatusCodes } = require('http-status-codes');

const Tax = require('../models/tax.model');
const User = require('../models/user.model');
const { msg } = require('../constant');
const { taxs } = require('../validation');
const { core } = require('../utils');

/*
 * @ API - Create Tax
 * @ method - POST
 * @ end point - http://localhost:4000/api/tax/new
 */
const createTax = async (req, res) => {
  try {
    const decoded = req.user;

    /* validate request body */
    const { error, value } = taxs.taxInfoSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const messages = error.details.map((detail) => ({
        field: detail.path[0],
        message: detail.message,
      }));
      return core.validateFields(res, messages);
    }

    /* find the user by id */
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return core.notFoundItem(res, msg.user.userNotFound);
    }
    const userInfo = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    /* find the tax item by name */
    const {
      taxName,
      taxCode,
      taxType,
      taxStatus,
      taxPercentage,
      description,
    } = value;
    const existingTax = await Tax.findOne({ taxName });
    if (existingTax) {
      return core.validateFields(res, msg.tax.taxAlreadyExist);
    }

    /* new tax */
    const newTaxs = new Tax({
      taxName,
      taxCode,
      taxType,
      taxStatus,
      taxPercentage,
      description,
      user: userInfo,
    });

    /* save the tax */
    await newTaxs.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: newTaxs,
      message: msg.tax.newTaxCreated,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * @ API - list of Taxes
 * @ method - GET
 * @ end point -
 * http://localhost:4000/api/tax/list                     -> without query param
 * http://localhost:4000/api/tax/list?page=1&limit=10     -> with query param
 */
const listOfTaxes = async (req, res) => {
  try {
    /* pagination code */
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const [listOfTax, totalItems] = await Promise.all([
      Tax.find().skip(skip).limit(limit),
      Tax.countDocuments(),
    ]);
    const totalPages = Math.ceil(totalItems / limit);

    /* find all the taxes */
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: listOfTax,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

module.exports = {
  createTax,
  listOfTaxes,
};
