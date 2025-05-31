const { StatusCodes } = require('http-status-codes');
const User = require('../models/user.model');
const { env } = require('../config');
const { msg } = require('../constant');
const { core } = require('../utils');

/*
 * @ API - User Register
 * @ method - POST
 * @ end point - http://localhost:4000/api/auth/signup
 */
const userSignup = async (req, res) => {
  try {
    /* validate request body */
    const value = req.validatedBody;

    /* find the existing user via email */
    const existingEmail = await User.findOne({
      email: value.email,
    });
    if (existingEmail) {
      return core.validateFields(res, msg.user.emailAlreadyExist);
    }

    /* new user */
    const user = new User({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: value.password,
      phone: value.phone,
      role: value.role,
    });

    /* save the user */
    await user.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: msg.user.newUserCreated,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * @ API - User Login
 * @ method - POST
 * @ end point - http://localhost:4000/api/auth/signin
 */
const userSignin = async (req, res) => {
  try {
    /* validate request body */
    const value = req.validatedBody;

    /* find the existing user via email */
    const user = await User.findOne({
      email: value.email,
    });
    if (!user) {
      return core.validateFields(res, msg.user.existUserEmail);
    }

    /* validate / compare the password */
    const isMatch = await user.comparePassword(value.password);
    if (!isMatch) {
      return core.validateFields(res, msg.user.userWrongPassword);
    }

    /* generated token */
    const token = user.generateAuthToken();
    res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODEENV,
      maxAge: env.EXPTIME,
    });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      token: token,
      role: user.role,
      message: msg.user.userLoginSuccessfully,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/*
 * @ API - User Logout
 * @ method - POST
 * @ end point - http://localhost:4000/api/auth/sign-out
 */
const userSignout = async (req, res) => {
  try {
    /* signout and clear cookie */
    res.clearCookie('token', {
      httpOnly: true,
      secure: env.NODEENV,
      sameSite: 'Strict',
    });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: msg.user.userLogoutSuccessfully,
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

module.exports = {
  userSignup,
  userSignin,
  userSignout,
};
