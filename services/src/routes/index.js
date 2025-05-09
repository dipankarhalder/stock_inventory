const express = require('express');
const router = express.Router();

const { routes } = require('../constant');
const { auth, profile, taxs } = require('../controllers');
const { authToken } = require('../middleware');

/* authentication */
router.post(routes.paths.signup, auth.userSignup);
router.post(routes.paths.signin, auth.userSignin);
router.post(routes.paths.signout, auth.userSignout);

/* profile */
router.get(routes.paths.profiledetails, authToken, profile.getProfile);
router.patch(routes.paths.updatepassword, authToken, profile.updatePassword);

/* taxes */
router.post(routes.paths.newTax, authToken, taxs.createTax);
router.get(routes.paths.listTaxs, authToken, taxs.listOfTaxes);

module.exports = {
  rootApiRouter: router,
};
