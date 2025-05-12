const { StatusCodes } = require('http-status-codes');
const Status = require('../models/status.model');
const { msg } = require('../constant');
const { core, userVal } = require('../utils');

/*
 * @ API - create status
 * @ method - POST
 * @ end point - http://localhost:4001/api/status/new
 */
const createStatus = async (req, res) => {
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

    /* find existing status */
    const { title, desc } = value;
    const existingStatus = await Status.findOne({ title });
    if (existingStatus) {
      return core.validateFields(res, msg.stats.statusAlreadyExist);
    }

    /* new category */
    const newStatus = new Status({
      title,
      desc,
      user: userInfo,
      lastEditedBy: userInfo,
    });

    /* save new category */
    await newStatus.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: newStatus,
      message: msg.stats.newStatusCreated,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

module.exports = {
  createStatus,
};
