const User = require('../models/user.model');
const { core } = require('../utils');
const { msg } = require('../constant');

const getUserOrRespondNotFound = async (id, res) => {
  const user = await User.findById(id).select('-password');
  if (!user) {
    core.notFoundItem(res, msg.user.userNotFound);
    return null;
  }
  return user;
};

module.exports = {
  getUserOrRespondNotFound,
};
