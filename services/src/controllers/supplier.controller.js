const { StatusCodes } = require('http-status-codes');

const Supplier = require('../models/supplier.model');
const User = require('../models/user.model');
const { msg } = require('../constant');
const { suppliers } = require('../validation');
const { core } = require('../utils');

/*
 * @ API - Create Supplier
 * @ method - POST
 * @ end point - http://localhost:4000/api/tax/new
 */
const createSupplier = async (req, res) => {
  try {
    const decoded = req.user;

    /* validate request body */
    const { error, value } = suppliers.supplierInfoSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return core.validateFields(res, error.details.map((detail) => detail.message).join(', '));
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
    const { supId, name, company, email, phone } = value;
    const existingTax = await Supplier.findOne({ supId });
    if (existingTax) {
      return core.validateFields(res, msg.suplr.supplierAlreadyExist);
    }

    /* new tax */
    const newSupplier = new Supplier({
      supId,
      name,
      company,
      email,
      phone,
      user: userInfo,
    });

    /* save the supplier */
    await newSupplier.save();

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      tax: newSupplier,
      message: msg.suplr.newSupplierCreated,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

module.exports = {
  createSupplier,
};
