const { StatusCodes } = require('http-status-codes');
const Tax = require('../models/tax.model');
const { msg } = require('../constant');
const { core, userVal } = require('../utils');

/*
 * @ API - Create Tax
 * @ method - POST
 * @ end point - http://localhost:4000/api/tax/new
 */
const createTax = async (req, res) => {
  try {
    const decoded = req.user;
    const value = req.validatedBody;

    /* find the user by id */
    const user = await userVal.getUserOrRespondNotFound(decoded.id, res);
    if (!user) return;

    const userInfo = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    /* find the tax item by name */
    const { taxName, taxCode, taxType, taxStatus, taxPercentage, description } = value;
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
