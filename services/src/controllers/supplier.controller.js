const { StatusCodes } = require('http-status-codes');

/*
 * @ API - Create Supplier
 * @ method - POST
 * @ end point - http://localhost:4000/api/tax/new
 */
const createSupplier = async (req, res) => {
  try {
    const decoded = req.user;

    /* validate request body */
    const { error, value } = taxs.taxInfoSchema.validate(req.body, {
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
      tax: newTaxs,
      message: msg.tax.newTaxCreated,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

module.exports = {
  createSupplier,
  listOfTaxes,
};
