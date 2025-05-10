const Joi = require('joi');
const { msg, role } = require('../constant');
const { valid } = require('../utils');

const userInfoSchema = Joi.object({
  firstName: valid.requiredString(msg.user.requireFirstName),
  lastName: valid.requiredString(msg.user.requireLastName),
  email: valid.email,
  password: valid.password,
  phone: valid.phone,
  role: Joi.string()
    .valid(
      role.userRole.SUPER,
      role.userRole.ADMIN,
      role.userRole.STUFF,
    )
    .required()
    .messages({
      'any.only': msg.user.requireRole,
    }),
});

const userLoginSchema = Joi.object({
  email: valid.email,
  password: valid.password,
});

const passwordSchema = Joi.object({
  oldPassword: Joi.string().min(6).required().messages({
    'string.empty': msg.user.requireOldPassword,
    'string.min': msg.user.oldMinimumPassword,
  }),
  newPassword: Joi.string()
    .min(6)
    .required()
    .not(Joi.ref('oldPassword'))
    .messages({
      'string.empty': msg.user.requireNewPassword,
      'string.min': msg.user.newMinimumPassword,
      'any.only': msg.user.compareBothPassword,
    }),
});

module.exports = {
  userInfoSchema,
  userLoginSchema,
  passwordSchema,
};
