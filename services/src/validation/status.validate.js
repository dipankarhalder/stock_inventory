const Joi = require('joi');
const { msg } = require('../constant');

const statusInfoSchema = Joi.object({
  title: Joi.string().max(60).required().messages({
    'string.empty': msg.stats.requireTitle,
    'string.max': msg.stats.maxTitle,
  }),
  desc: Joi.string().max(255).required().messages({
    'string.empty': msg.stats.requireDesc,
    'string.max': msg.stats.maxDesc,
  }),
});

module.exports = {
  statusInfoSchema,
};
