const { StatusCodes } = require('http-status-codes');

const Supplier = require('../models/supplier.model');
const User = require('../models/user.model');
const { msg } = require('../constant');
const { suppliers } = require('../validation');
const { core } = require('../utils');

/*
 * @ API - Create Supplier
 * @ method - POST
 * @ end point - http://localhost:4000/api/supplier/new
 */
const createSupplier = async (req, res) => {
  try {
    const decoded = req.user;

    /* validate request body */
    const { error, value } = suppliers.supplierInfoSchema.validate(req.body, {
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
      data: newSupplier,
      message: msg.suplr.newSupplierCreated,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * @ API - list of supplier
 * @ method - GET
 * @ end point - http://localhost:4000/api/supplier/list  or  http://localhost:4000/api/supplier/list?page=1&limit=10
 */
const listOfSuppliers = async (req, res) => {
  try {
    /* pagination code */
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const [supplierItems, totalItems] = await Promise.all([Supplier.find().skip(skip).limit(limit), Supplier.countDocuments()]);
    const totalPages = Math.ceil(totalItems / limit);

    /* find all the supplier */
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: supplierItems,
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
  createSupplier,
  listOfSuppliers,
};
