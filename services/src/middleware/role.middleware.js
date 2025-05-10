const { StatusCodes } = require('http-status-codes');
const { msg } = require('../constant');

const authorizeRoles = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!roles.includes(userRole)) {
      return res.status(StatusCodes.FORBIDDEN).json({
        status: StatusCodes.FORBIDDEN,
        message: msg.user.accessRole,
      });
    }

    next();
  };
};

module.exports = authorizeRoles;
