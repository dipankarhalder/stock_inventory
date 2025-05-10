const express = require('express');
const router = express.Router();

const { routes, role } = require('../constant');
const { auth, profile, taxs, supplier } = require('../controllers');
const { authToken, authRole } = require('../middleware');

const { SUPER, ADMIN, STUFF } = role.userRole;

/* authentication */
router.post(routes.paths.signup, auth.userSignup);
router.post(routes.paths.signin, auth.userSignin);
router.post(routes.paths.signout, auth.userSignout);

/* profile */
router.get(
  routes.paths.profiledetails,
  authToken,
  authRole([SUPER, ADMIN, STUFF]),
  profile.getProfile,
);
router.patch(
  routes.paths.updatepassword,
  authToken,
  authRole([SUPER, ADMIN, STUFF]),
  profile.updatePassword,
);

/* taxes */
router.post(
  routes.paths.newTax,
  authToken,
  authRole([SUPER, ADMIN]),
  taxs.createTax,
);
router.get(
  routes.paths.listTaxs,
  authToken,
  authRole([SUPER, ADMIN]),
  taxs.listOfTaxes,
);

/* supplier */
router.post(
  routes.paths.newSupplier,
  authToken,
  authRole([SUPER, ADMIN]),
  supplier.createSupplier,
);
router.get(
  routes.paths.listSupplier,
  authToken,
  authRole([SUPER, ADMIN]),
  supplier.listOfSuppliers,
);
router.get(
  routes.paths.supplierItem,
  authToken,
  authRole([SUPER, ADMIN]),
  supplier.viewSupplierDetails,
);
router.patch(
  routes.paths.supplierItem,
  authToken,
  authRole([SUPER, ADMIN]),
  supplier.updateSupplier,
);
router.patch(
  routes.paths.supplierItem,
  authToken,
  authRole([SUPER]),
  supplier.deleteSupplierDetails,
);

module.exports = {
  rootApiRouter: router,
};
