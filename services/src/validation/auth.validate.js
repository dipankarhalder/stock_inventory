const Joi = require('joi');
const { msg } = require('../constant');

const userInfoSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'string.empty': msg.user.requireFirstName,
  }),
  lastName: Joi.string().required().messages({
    'string.empty': msg.user.requireLastName,
  }),
  email: Joi.string().email().required().messages({
    'string.empty': msg.user.requireEmail,
    'string.email': msg.user.validateUserEmail,
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': msg.user.requirePassword,
    'string.min': msg.user.minimumPassword,
  }),
  phone: Joi.string().min(10).required().messages({
    'string.empty': msg.user.requirePhone,
    'string.min': msg.user.minimumPhone,
  }),
  role: Joi.string().valid('super_admin', 'admin', 'staff').required().messages({
    'any.only': msg.user.requireRole,
  }),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': msg.user.requireEmail,
    'string.email': msg.user.validateUserEmail,
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': msg.user.requirePassword,
    'string.min': msg.user.minimumPassword,
  }),
});

const passwordSchema = Joi.object({
  oldPassword: Joi.string().min(6).required().messages({
    'string.empty': msg.user.requireOldPassword,
    'string.min': msg.user.oldMinimumPassword,
  }),
  newPassword: Joi.string().min(6).required().not(Joi.ref('oldPassword')).messages({
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
