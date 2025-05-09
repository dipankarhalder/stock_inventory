const Joi = require('joi');
const { msg } = require('../constant');

const taxInfoSchema = Joi.object({
  taxName: Joi.string().max(60).required().messages({
    'string.empty': msg.tax.requireTaxName,
    'string.max': msg.tax.maximumTaxName,
  }),
  taxCode: Joi.string().max(30).required().messages({
    'string.empty': msg.tax.requireTaxCode,
    'string.max': msg.tax.maximumTaxCode,
  }),
  taxType: Joi.string().valid('exclusive', 'inclusive').required().messages({
    'any.only': msg.tax.requireTaxTpye,
  }),
  taxStatus: Joi.string().valid('active', 'inactive').required().messages({
    'any.only': msg.tax.requireTaxStatus,
  }),
  taxPercentage: Joi.string().required().messages({
    'string.empty': msg.tax.requireTaxPercent,
  }),
  description: Joi.string().max(255).messages({
    'string.max': msg.tax.maximumDesc,
  }),
});

module.exports = {
  taxInfoSchema,
};
