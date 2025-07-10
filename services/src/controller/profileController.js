const path = require('path');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/userModel');
const { core, userUtils } = require('../utils');

/* 
  @service - Logged-in user details,
  @method - GET,
*/
exports.userProfile = async (req, res) => {
  try {
    const decoded = req.user;
    const user = await userUtils.getUserOrRespondNotFound(decoded.id, res);
    if (!user) return;

    const sanitizedUser = { ...user._doc };
    delete sanitizedUser.password;

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: sanitizedUser,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* 
  @service - List of users,
  @method - GET,
*/
exports.membersProfile = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find().select('-password').skip(skip).limit(limit).lean(),
      User.countDocuments(),
    ]);

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* 
  @service - profile image update,
  @method - GET,
*/
exports.updateProfileImage = async (req, res) => {
  try {
    const decoded = req.user;
    if (!req.file) {
      return core.validateFields(res, 'No image file uploaded.');
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      core.deleteUploadedFile(req.file);
      return core.validateFields(res, 'User not found.');
    }

    if (user.profileImage) {
      const oldImagePath = path.join('src', user.profileImage);
      core.deleteUploadedFile({ path: oldImagePath });
    }

    const newImagePath = path.join('uploads', req.file.filename);
    user.profileImage = newImagePath;
    await user.save();

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Profile image updated successfully.',
      data: {
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    core.deleteUploadedFile(req.file);
    return core.sendErrorResponse(res, error);
  }
};

/* 
  @service - profile approve,
  @method - POST,
*/
exports.approvalUsers = async (req, res) => {
  try {
    const { role: currentUserRole } = req.user;
    const { userIdToApprove } = req.body;

    const targetUser = await User.findById(userIdToApprove);
    if (!targetUser) {
      return core.validateFields(res, 'User to approve not found.');
    }

    if (!userUtils.canModifyRole(currentUserRole, targetUser.role)) {
      return core.validateFields(
        res,
        `You are not allowed to approve a user with the "${targetUser.role}" role.`,
      );
    }
    if (targetUser.isApproved) {
      return core.validateFields(res, 'This user is already approved.');
    }

    targetUser.isApproved = true;
    await targetUser.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: `${targetUser.role} "${targetUser.firstName} ${targetUser.lastName}" has been approved successfully.`,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* 
  @service - profile status,
  @method - POST,
*/
exports.updateUserActiveStatus = async (req, res) => {
  try {
    const { role: currentUserRole } = req.user;
    const { userIdToUpdate, isActive } = req.body;

    const targetUser = await User.findById(userIdToUpdate);
    if (!targetUser) {
      return core.validateFields(res, 'User not found.');
    }

    if (!userUtils.canModifyRole(currentUserRole, targetUser.role)) {
      return core.validateFields(
        res,
        `You are not allowed to change the active status of a "${targetUser.role}".`,
      );
    }

    targetUser.isActive = isActive;
    await targetUser.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: `${targetUser.role} "${targetUser.firstName} ${targetUser.lastName}" has been ${isActive ? 'activated' : 'deactivated'} successfully.`,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};
