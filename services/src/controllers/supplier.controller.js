const { StatusCodes } = require('http-status-codes');
const Supplier = require('../models/supplier.model');
const { msg, role } = require('../constant');
const { core, userVal } = require('../utils');

/*
 * @ API - Create Supplier
 * @ method - POST
 * @ end point - http://localhost:4000/api/supplier/new
 */
const createSupplier = async (req, res) => {
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

    /* find the supplier item by name */
    const { supId, name, company, email, phone } = value;
    const existingItem = await Supplier.findOne({ supId });
    if (existingItem) {
      return core.validateFields(res, msg.suplr.supplierAlreadyExist);
    }

    /* new supplier */
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
 * @ end point -
 * http://localhost:4000/api/supplier/list                    -> without query param
 * http://localhost:4000/api/supplier/list?page=1&limit=10    -> with query param
 */
const listOfSuppliers = async (req, res) => {
  try {
    /* pagination code */
    // const page = parseInt(req.query.page, 10) || 1;
    // const limit = parseInt(req.query.limit, 10) || 10;
    // const skip = (page - 1) * limit;

    /* filter by status (active, not-active) */
    // const statusFilter = req.query.status;
    // const filter = {};
    // if (statusFilter === 'active' || statusFilter === 'inactive') {
    //   filter.status = statusFilter;
    // }

    // const [supplierItems, totalItems] = await Promise.all([
    //   Supplier.find(filter).skip(skip).limit(limit),
    //   Supplier.countDocuments(filter),
    // ]);
    // const totalPages = Math.ceil(totalItems / limit);

    const supplierItems = await Supplier.find();

    /* find all the supplier */
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: supplierItems,
      // pagination: {
      //   totalItems,
      //   totalPages,
      //   currentPage: page,
      //   pageSize: limit,
      // },
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * @ API - supplier details
 * @ method - GET
 * @ end point - http://localhost:4000/api/supplier/:id
 */
const viewSupplierDetails = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const supplierDetails = await Supplier.findById(supplierId);
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: supplierDetails,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * @ API - update supplier
 * @ method - PATCH
 * @ end point - http://localhost:4000/api/supplier/:id
 */
const updateSupplier = async (req, res) => {
  try {
    const decoded = req.user;
    const supplierId = req.params.id;
    const value = req.validatedBody;

    /* validate user */
    const user = await userVal.getUserOrRespondNotFound(decoded.id, res);
    if (!user) return;

    /* Check for duplicate supId (but ignore the current one) */
    const existing = await Supplier.findOne({
      supId: value.supId,
      _id: { $ne: supplierId },
    });
    if (existing) {
      return core.validateFields(res, msg.suplr.supplierAlreadyExist);
    }

    const userInfo = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    /* update supplier */
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      supplierId,
      {
        ...value,
        user: userInfo,
      },
      { new: true },
    );

    if (!updatedSupplier) {
      return core.notFoundItem(res, msg.suplr.notFoundItem);
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: updatedSupplier,
      message: msg.suplr.supplierUpdated,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * @ API - supplier soft delete / update status
 * @ method - PATCH
 * @ end point - http://localhost:4000/api/supplier/:id
 */
const softDeleteSupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const { status } = req.body;

    const validStatuses = [role.coreStatus.active, role.coreStatus.inactive];
    if (!validStatuses.includes(status)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: msg.suplr.invalidStatus,
      });
    }

    const updatedSupplier = await Supplier.findByIdAndUpdate(supplierId, { status }, { new: true });

    if (!updatedSupplier) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: StatusCodes.NOT_FOUND,
        message: msg.suplr.notFoundItem,
      });
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: msg.suplr.updateSupplier,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * @ API - delete supplier
 * @ method - DELETE
 * @ end point - http://localhost:4000/api/supplier/:id
 */
const finallyDeleteSupplier = async (req, res) => {
  try {
    const decoded = req.user;
    const supplierId = req.params.id;

    /* validate that the user exists */
    const user = await userVal.getUserOrRespondNotFound(decoded.id, res);
    if (!user) return;

    /* check if the supplier exists */
    const supplierDetails = await Supplier.findById(supplierId);
    if (!supplierDetails) {
      return core.notFoundItem(res, msg.suplr.notFoundItem);
    }

    /* delete the supplier */
    await Supplier.deleteOne({ _id: supplierId });
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: msg.suplr.updateSupplier,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

module.exports = {
  createSupplier,
  listOfSuppliers,
  viewSupplierDetails,
  updateSupplier,
  softDeleteSupplier,
  finallyDeleteSupplier,
};
