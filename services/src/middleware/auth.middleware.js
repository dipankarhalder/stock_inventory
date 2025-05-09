const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { env } = require('../config');
const { msg } = require('../constant');

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: StatusCodes.UNAUTHORIZED,
        message: msg.user.accessDenied,
      });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWTSECRET);
    if (!decoded) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: StatusCodes.UNAUTHORIZED,
        message: msg.user.invalidToken,
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      message: msg.user.invalidToken,
      error: error.message,
    });
  }
};

module.exports = verifyToken;
