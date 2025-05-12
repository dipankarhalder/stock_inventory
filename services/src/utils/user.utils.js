const User = require('../models/user.model');
const { notFoundItem } = require('./core.utils');
const { msg } = require('../constant');

const getUserOrRespondNotFound = async (id, res) => {
  const user = await User.findById(id).select('-password');
  if (!user) {
    notFoundItem(res, msg.user.userNotFound);
    return null;
  }
  return user;
};

module.exports = {
  getUserOrRespondNotFound,
};
