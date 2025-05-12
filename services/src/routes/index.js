const express = require('express');
const router = express.Router();

const { routes, role } = require('../constant');
const { auth, taxs, suppliers, statuss } = require('../validation');
const { authenticate, profile, taxServ, supplier, statuses } = require('../controllers');
const { authToken, authRole, authValid } = require('../middleware'); // uploadMedia

const { SUPER, ADMIN, STUFF } = role.userRole;

/* authentication */
router.post(routes.paths.signup, authValid(auth.userInfoSchema), authenticate.userSignup);
router.post(routes.paths.signin, authValid(auth.userLoginSchema), authenticate.userSignin);
router.post(routes.paths.signout, authenticate.userSignout);

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
  authValid(auth.passwordSchema),
  profile.updatePassword,
);

/* taxes */
router.post(
  routes.paths.newTax,
  authToken,
  authRole([SUPER, ADMIN]),
  authValid(taxs.taxInfoSchema),
  taxServ.createTax,
);
router.get(routes.paths.listTaxs, authToken, authRole([SUPER, ADMIN]), taxServ.listOfTaxes);

/* supplier */
router.post(
  routes.paths.newSupplier,
  authToken,
  authRole([SUPER, ADMIN]),
  authValid(suppliers.supplierInfoSchema),
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
  authRole([SUPER, ADMIN]),
  supplier.softDeleteSupplier,
);
router.delete(
  routes.paths.supplierItem,
  authToken,
  authRole([SUPER, ADMIN]),
  supplier.finallyDeleteSupplier,
);

/* status */
router.post(
  routes.paths.newStatus,
  authToken,
  authRole([SUPER, ADMIN]),
  authValid(statuss.statusInfoSchema),
  statuses.createStatus,
);

module.exports = {
  rootApiRouter: router,
};
