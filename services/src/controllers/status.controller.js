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

/*
 * @ API - List of status
 * @ method - GET
 * @ end point - http://localhost:4001/api/status/lists
 */
const getAllStatus = async (req, res) => {
  try {
    /* find all status */
    const statuses = await Status.find();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      list: statuses,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * @ API - delete status details
 * @ method - DELETE
 * @ end point - http://localhost:4001/api/status/:id
 */
const deleteStatus = async (req, res) => {
  try {
    const id = req.params.id;

    /* check the status is available or not */
    const statuss = await Status.findById(id);
    if (!statuss) {
      return core.notFoundItem(res, msg.stats.statusNotFound);
    }

    /* delete the status */
    await Status.findByIdAndDelete(id);
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: msg.stats.statusDeleted,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

module.exports = {
  createStatus,
  getAllStatus,
  deleteStatus,
};
