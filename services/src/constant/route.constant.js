const paths = {
  /* base route */
  base: '/api',

  /* auth */
  signup: '/auth/signup',
  signin: '/auth/signin',
  signout: '/auth/signout',

  /* profile */
  profiledetails: '/profile/me',
  updatepassword: '/profile/update-password',

  /* taxes */
  newTax: '/tax/new',
  listTaxs: '/tax/list',
  taxItem: '/tax/:id',

  /* status */
  newStatus: '/status/new',
  listStatus: '/status/list',
  statusItem: '/status/:id',

  /* supplier */
  newSupplier: '/supplier/new',
  listSupplier: '/supplier/list',
  supplierItem: '/supplier/:id',
};

module.exports = {
  paths,
};
