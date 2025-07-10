const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UAParser = require('ua-parser-js');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/userModel');
const { core } = require('../utils');
const { env } = require('../config');

/* 
  @service - User Registration,
  @method - POST,
*/
exports.userSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;

    const existingInfo = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingInfo) {
      const message =
        existingInfo.email === email
          ? 'The email address you entered is already associated with an existing account.'
          : 'The phone no you entered is already associated with an existing account.';
      return core.validateFields(res, message);
    }

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashPassword,
      role,
    });

    await newUser.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'New user registered successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* 
  @service - User Login,
  @method - POST,
*/
exports.userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select(
      '+password +refreshTokens',
    );
    if (!user) {
      return core.validateFields(
        res,
        'The email address you entered is not associated with any account.',
      );
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return core.validateFields(
        res,
        'The password you entered is invalid, please try again.',
      );
    }

    const payloadToken = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    };
    const accessToken = jwt.sign(payloadToken, env.JWT_ACCESS, {
      expiresIn: env.ACCESS_EXPIRY || '15m',
    });
    const refreshToken = jwt.sign(payloadToken, env.JWT_REFRESH, {
      expiresIn: env.REFRESH_EXPIRY || '7d',
    });

    const parser = new UAParser();
    const ua = parser.setUA(req.headers['user-agent']).getResult();
    const deviceInfo = {
      token: refreshToken,
      device: ua.device.type || 'desktop',
      browser: ua.browser.name,
      os: ua.os.name,
    };

    if (user.refreshTokens.length >= 5) {
      user.refreshTokens.shift();
    }
    user.refreshTokens.push(deviceInfo);
    await user.save();
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      accessToken,
      role: user.role,
      message: 'You are successfully logged-in.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* 
  @service - Generate new access token,
  @method - POST,
*/
exports.refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return core.validateFields(res, 'Refresh token not provided.');
    }

    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH);
    const user = await User.findById(decoded.id).select('+refreshTokens');
    if (!user) {
      return core.validateFields(
        res,
        'Invalid refresh token. Please sign in again.',
      );
    }

    const tokenRecord = user.refreshTokens.find(
      (session) => session.token === refreshToken,
    );
    if (!tokenRecord) {
      return core.validateFields(
        res,
        'Session expired or not found. Please sign in again.',
      );
    }

    const payload = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    };
    const newAccessToken = jwt.sign(payload, env.JWT_ACCESS, {
      expiresIn: env.ACCESS_EXPIRY || '15m',
    });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      accessToken: newAccessToken,
      message: 'Access token refreshed successfully',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};

/* 
  @service - signout user,
  @method - POST,
*/
exports.userSignout = async (req, res) => {
  try {
    const tokenFromCookie = req.cookies.refreshToken;

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    if (!tokenFromCookie || !req.user.id) {
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: 'You are logged out successfully.',
      });
    }

    const user = await User.findById(req.user.id).select('+refreshTokens');
    if (user) {
      user.refreshTokens = user.refreshTokens.filter(
        (rt) => rt.token !== tokenFromCookie,
      );
      await user.save();
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'You are logged out successfully.',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};
