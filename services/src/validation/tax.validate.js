const Joi = require('joi');
const { msg, role } = require('../constant');
const { valid } = require('../utils');

const taxInfoSchema = Joi.object({
  taxName: Joi.string().max(60).required().messages({
    'string.empty': msg.tax.requireTaxName,
    'string.max': msg.tax.maximumTaxName,
  }),
  taxCode: Joi.string().max(30).required().messages({
    'string.empty': msg.tax.requireTaxCode,
    'string.max': msg.tax.maximumTaxCode,
  }),
  taxType: Joi.string()
    .valid(role.taxesTypes.inclusive, role.taxesTypes.exclusive)
    .required()
    .messages({
      'any.only': msg.tax.requireTaxTpye,
    }),
  taxStatus: Joi.string()
    .valid(role.coreStatus.active, role.coreStatus.inactive)
    .required()
    .messages({
      'any.only': msg.tax.requireTaxStatus,
    }),
  taxPercentage: valid.requiredString(msg.tax.requireTaxPercent),
  description: Joi.string().max(255).messages({
    'string.max': msg.tax.maximumDesc,
  }),
});

module.exports = {
  taxInfoSchema,
};
