const Joi = require('joi');
const { msg } = require('../constant');

const supplierInfoSchema = Joi.object({
  supId: Joi.string().required().messages({
    'string.empty': msg.suplr.requireId,
  }),
  name: Joi.string().required().messages({
    'string.empty': msg.suplr.requireName,
  }),
  company: Joi.string().required().messages({
    'string.empty': msg.suplr.requireCompany,
  }),
  email: Joi.string().email().required().messages({
    'string.empty': msg.suplr.requireEmail,
    'string.email': msg.suplr.validateSupplierEmail,
  }),
  phone: Joi.string().min(10).required().messages({
    'string.empty': msg.suplr.requirePhone,
    'string.min': msg.suplr.minimumPhone,
  }),
});

module.exports = {
  supplierInfoSchema,
};
