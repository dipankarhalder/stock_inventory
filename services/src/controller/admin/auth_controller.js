const { StatusCodes } = require('http-status-codes');
const User = require('../../models/admin/user_model');
const { core } = require('../../utils');

exports.userSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;

    const existingInfo = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingInfo) {
      const message =
        existingInfo.email === email
          ? 'The email address you entered is already associated with an existing account.'
          : 'The phone no. you entered is already associated with an existing account.';
      return core.validateFields(res, message);
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
    });

    await newUser.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'New user successfully registered',
    });
  } catch (error) {
    return core.sendErrorResponse(res, error);
  }
};
