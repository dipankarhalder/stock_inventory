const { StatusCodes } = require('http-status-codes');

const roles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(StatusCodes.FORBIDDEN).json({
        status: StatusCodes.FORBIDDEN,
        message:
          'Access denied. You do not have permission to perform this action.',
      });
    }

    next();
  };
};

module.exports = roles;
