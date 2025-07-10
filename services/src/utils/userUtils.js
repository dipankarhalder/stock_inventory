const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/userModel');
const { notFoundItem } = require('./coreUtils');

const getUserOrRespondNotFound = async (id, res) => {
  const user = await User.findById(id).select('-password');
  if (!user) {
    notFoundItem(res, 'The user is not found.');
    return null;
  }
  return user;
};

const isValidObjectId = (id, res, label = 'ID') => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: `Please enter a valid ${label.toLowerCase()}`,
    });
    return false;
  }
  return true;
};

const canModifyRole = (actorRole, targetRole) => {
  const permissions = {
    super_admin: ['admin', 'staff', 'customer'],
    admin: ['staff'],
  };

  if (!permissions[actorRole]) return false;
  return permissions[actorRole].includes(targetRole);
};

const checkUserRole = (user, requiredRoles, res, customMessage) => {
  if (!requiredRoles.includes(user.role)) {
    return res.status(StatusCodes.FORBIDDEN).json({
      status: StatusCodes.FORBIDDEN,
      message:
        customMessage || 'You do not have permission to perform this action.',
    });
  }
  return null;
};

module.exports = {
  getUserOrRespondNotFound,
  isValidObjectId,
  canModifyRole,
  checkUserRole,
};
