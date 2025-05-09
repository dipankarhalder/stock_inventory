const { userSignup, userSignin, userSignout } = require('./auth.controller');
const { getProfile, updatePassword } = require('./profile.controller');
const { createTax, listOfTaxes } = require('./tax.controller');

module.exports = {
  auth: {
    userSignup,
    userSignin,
    userSignout,
  },
  profile: {
    getProfile,
    updatePassword,
  },
  taxs: {
    createTax,
    listOfTaxes,
  },
};
