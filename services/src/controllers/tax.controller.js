const { StatusCodes } = require('http-status-codes');

const Tax = require('../models/tax.model');
const User = require('../models/user.model');
const { msg } = require('../constant');
const { taxs } = require('../validation');
const { comutils } = require('../utils');

/* create category */
const createTax = async (req, res) => {
  try {
    const decoded = req.user;

    /* validate request body */
    const { error, value } = taxs.taxInfoSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return comutils.validateFields(res, error.details.map((detail) => detail.message).join(', '));
    }

    /* find the user by id */
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return comutils.notFoundItem(res, msg.user.userNotFound);
    }
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
      return comutils.validateFields(res, msg.tax.taxAlreadyExist);
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
      tax: newTaxs,
      message: msg.tax.newTaxCreated,
    });
  } catch (error) {
    return comutils.sendErrorResponse(res, error);
  }
};

const listOfTaxes = async (req, res) => {
  try {
    /* find all the taxes */
    const listOfTax = await Tax.find();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      tax: listOfTax,
    });
  } catch (error) {
    return comutils.sendErrorResponse(res, error);
  }
};

module.exports = {
  createTax,
  listOfTaxes,
};
