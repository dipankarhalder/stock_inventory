const { userSignup, userSignin, userSignout } = require('./auth.controller');
const { getProfile, updateAdminPassword } = require('./profile.controller');
const { createTax, listOfTaxes } = require('./tax.controller');

module.exports = {
  auth: {
    userSignup,
    userSignin,
    userSignout,
  },
  profile: {
    getProfile,
    updateAdminPassword,
  },
  taxs: {
    createTax,
    listOfTaxes,
  },
};
