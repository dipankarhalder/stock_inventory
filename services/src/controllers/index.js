const { userSignup, userSignin, userSignout } = require('./auth.controller');
const { getProfile, updatePassword } = require('./profile.controller');
const { createTax, listOfTaxes } = require('./tax.controller');
const {
  createSupplier,
  listOfSuppliers,
  updateSupplier,
  viewSupplierDetails,
  softDeleteSupplier,
  finallyDeleteSupplier,
} = require('./supplier.controller');
const { createStatus, getAllStatus, deleteStatus } = require('./status.controller');
const {
  createCategory,
  listCategories,
  getCategory,
  deleteCategory,
} = require('./category.controller');

module.exports = {
  authenticate: {
    userSignup,
    userSignin,
    userSignout,
  },
  profile: {
    getProfile,
    updatePassword,
  },
  taxServ: {
    createTax,
    listOfTaxes,
  },
  supplier: {
    createSupplier,
    listOfSuppliers,
    updateSupplier,
    viewSupplierDetails,
    softDeleteSupplier,
    finallyDeleteSupplier,
  },
  statuses: {
    createStatus,
    getAllStatus,
    deleteStatus,
  },
  ucategroies: {
    createCategory,
    listCategories,
    getCategory,
    deleteCategory,
  },
};
