const Joi = require('joi');

const email = Joi.string().email().required().messages({
  'string.empty': 'Email addesss should not be blank.',
  'string.email': 'Please enter a valid email address',
});

const phone = Joi.string()
  .pattern(/^[0-9]{10}$/)
  .required()
  .messages({
    'string.empty': 'Phone number should not be blank.',
    'string.pattern.base': 'Phone number must be a valid 10-digit number.',
  });

const password = Joi.string()
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={[}\]:;"'|,.<>/?]).{6,}$/,
  )
  .required()
  .messages({
    'string.empty': 'Password should not be blank.',
    'string.pattern.base':
      'Password must be at least 6 characters and include an uppercase letter, a lowercase letter, a number, and a special character.',
  });

const requiredString = (emptyMsg, spaceMsg) =>
  Joi.string()
    .required()
    .pattern(/^\S(?:.*\S)?$/)
    .messages({
      'string.empty': emptyMsg,
      'string.pattern.base': spaceMsg,
    });

const admin_signup_validate = Joi.object({
  firstName: requiredString(
    'First Name should not be blank.',
    'First Name should not contain leading or trailing spaces.',
  ),
  lastName: requiredString(
    'Last Name should not be blank.',
    'Last Name should not contain leading or trailing spaces.',
  ),
  email,
  password,
  phone,
  role: Joi.string()
    .valid('super_admin', 'admin', 'staff')
    .required()
    .messages({
      'any.only': 'Please select a valid user role.',
    }),
});

module.exports = {
  admin_signup_validate,
};
