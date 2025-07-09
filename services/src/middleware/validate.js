const { StatusCodes } = require('http-status-codes');

const validReq = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: error.details.map((detail) => ({
          message: detail.message,
          path: detail.path,
        })),
      });
    }
    next();
  };
};

module.exports = {
  validReq,
};
