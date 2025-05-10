const express = require('express');
const router = express.Router();

const { routes, role } = require('../constant');
const { auth, profile, taxs } = require('../controllers');
const { authToken, authRole } = require('../middleware');

const { SUPER, ADMIN, STUFF } = role.userRole;

/* authentication */
router.post(routes.paths.signup, auth.userSignup);
router.post(routes.paths.signin, auth.userSignin);
router.post(routes.paths.signout, auth.userSignout);

/* profile */
router.get(routes.paths.profiledetails, authToken, authRole([SUPER, ADMIN, STUFF]), profile.getProfile);
router.patch(routes.paths.updatepassword, authToken, authRole([SUPER, ADMIN, STUFF]), profile.updatePassword);

/* taxes */
router.post(routes.paths.newTax, authToken, authRole([SUPER, ADMIN]), taxs.createTax);
router.get(routes.paths.listTaxs, authToken, authRole([SUPER, ADMIN]), taxs.listOfTaxes);

module.exports = {
  rootApiRouter: router,
};
