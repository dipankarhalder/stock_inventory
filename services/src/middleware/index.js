module.exports = {
  authToken: require('./auth.middleware'),
  authRole: require('./role.middleware'),
  authValid: require('./validate.middleware'),
};
