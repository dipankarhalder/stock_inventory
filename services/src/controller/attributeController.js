const { StatusCodes } = require('http-status-codes');
const Attribute = require('../models/attributeModel');
const { core, userUtils } = require('../utils');

/* 
  @service - Attribute create,
  @method - POST,
*/
exports.createAttribute = async (req, res) => {
  try {
    const { name, code } = req.body;
    const user = req.user;

    const roleCheckError = userUtils.checkUserRole(
      user,
      ['customer'],
      res,
      'Only customers are allowed to create attribute.',
    );
    if (roleCheckError) return roleCheckError;

    const existingInfo = await Attribute.findOne({ $or: [{ name }, { code }] });
    if (existingInfo) {
      const message =
        existingInfo.code === code
          ? 'The code you entered is already associated with an attribute.'
          : 'The name you entered is already associated with an attribute .';
      return core.validateFields(res, message);
    }

    const newAttribute = new Attribute({
      name,
      code,
      createBy: user.id,
      updatedBy: user.id,
    });

    await newAttribute.save();
    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      data: newAttribute,
      message: 'New attribute created successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* 
  @service - Attributes list,
  @method - GET,
*/
exports.getAttributes = async (req, res) => {
  try {
    const user = req.user;
    const roleCheckError = userUtils.checkUserRole(user, ['customer'], res);
    if (roleCheckError) return roleCheckError;

    const attributes = await Attribute.find({ createBy: user.id })
      .populate('createBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'All the attributes listed successfully.',
      data: attributes,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* 
  @service - Attribute details,
  @method - GET,
*/
exports.getAttribute = async (req, res) => {
  try {
    const id = req.params.id;
    if (!userUtils.isValidObjectId(id, res, 'Attribute ID')) return;

    const attributeInfo = await Attribute.findById(id)
      .populate('createBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');
    if (!attributeInfo) {
      return core.notFoundItem(res, 'Attribute not found.');
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: attributeInfo,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
  @service - Attribute status,
  @method - POST,
*/
exports.updateAttributeActiveStatus = async (req, res) => {
  try {
    const { attributeId, isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      return core.validateFields(res, 'Invalid isActive value.');
    }

    const attributeInfo = await Attribute.findById(attributeId);
    if (!attributeInfo) {
      return core.validateFields(res, 'Attribute not found.');
    }

    attributeInfo.isActive = isActive;
    attributeInfo.updatedBy = req.user.id;
    await attributeInfo.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: `Attribute '${attributeInfo.name}' has been ${isActive ? 'activated' : 'deactivated'} successfully.`,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};
