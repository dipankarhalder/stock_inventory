const Joi = require('joi');
const { msg } = require('../constant');
const { valid } = require('../utils');

const supplierInfoSchema = Joi.object({
  supId: valid.requiredString(msg.suplr.requireId),
  name: valid.requiredString(msg.suplr.requireName),
  company: valid.requiredString(msg.suplr.requireCompany),
  email: valid.email,
  phone: valid.phone,
});

module.exports = {
  supplierInfoSchema,
};
