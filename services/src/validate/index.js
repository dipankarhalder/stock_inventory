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
    .valid('super_admin', 'admin', 'staff', 'customer')
    .required()
    .messages({
      'any.only': 'Please select a valid user role.',
    }),
});

const admin_signin_validate = Joi.object({
  email,
  password,
});

const warehouse_validate = Joi.object({
  name: requiredString('Warehouse name should not be blank.', ''),
  code: requiredString(
    'Warehouse code should not be blank.',
    'Warehouse code should not contain leading or trailing spaces.',
  ),
  address: requiredString('Warehouse address should not be blank.', ''),
});

const shop_validate = Joi.object({
  name: requiredString('Shop name should not be blank.', ''),
  code: requiredString(
    'Shop code should not be blank.',
    'Shop code should not contain leading or trailing spaces.',
  ),
  address: requiredString('Shop address should not be blank.', ''),
});

const category_validate = Joi.object({
  name: requiredString('Category name should not be blank.', ''),
  code: requiredString(
    'Category code should not be blank.',
    'Category code should not contain leading or trailing spaces.',
  ),
});

const subcategory_validate = Joi.object({
  name: requiredString('Sub category name should not be blank.', ''),
  code: requiredString(
    'Sub category code should not be blank.',
    'Sub category code should not contain leading or trailing spaces.',
  ),
});

const brand_validate = Joi.object({
  name: requiredString('Brand name should not be blank.', ''),
  code: requiredString(
    'Brand code should not be blank.',
    'Brand code should not contain leading or trailing spaces.',
  ),
});

module.exports = {
  admin_signup_validate,
  admin_signin_validate,
  warehouse_validate,
  shop_validate,
  category_validate,
  subcategory_validate,
  brand_validate,
};
