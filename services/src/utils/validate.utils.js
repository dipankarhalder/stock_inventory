const Joi = require('joi');
const { msg } = require('../constant');

const email = Joi.string().email().required().messages({
  'string.empty': msg.common.requireEmail,
  'string.email': msg.common.validateUserEmail,
});

const password = Joi.string().min(6).required().messages({
  'string.empty': msg.common.requirePassword,
  'string.min': msg.common.minimumPassword,
});

const phone = Joi.string().min(10).required().messages({
  'string.empty': msg.common.requirePhone,
  'string.min': msg.common.minimumPhone,
});

const requiredString = (fieldMsg) =>
  Joi.string().required().messages({
    'string.empty': fieldMsg,
  });

module.exports = {
  email,
  password,
  phone,
  requiredString,
};
