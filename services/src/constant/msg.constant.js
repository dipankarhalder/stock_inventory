const db = {
  success: 'Database successfully connected on port: 27017.',
  failed: 'Database failed to connect.',
};

const server = {
  success: 'Server successfully started on port:',
  somethingWrong: 'Something went wrong, please try again later.',
  serverError: 'Internal Server Error',
  notFound: 'The API url not found.',
};

const user = {
  requireFirstName: 'First Name should not be blank.',
  requireLastName: 'Last Name should not be blank.',
  requirePhone: 'Phone number should not be blank.',
  requireEmail: 'Email addesss should not be blank.',
  requirePassword: 'Password should not be blank.',
  requireOldPassword: 'Old password should not be blank.',
  requireNewPassword: 'New password should not be blank.',
  requireRole: 'Role should be select a option.',
  validateUserEmail: 'Please enter a valid email address',
  minimumPassword: 'Password must be at least 6 characters.',
  minimumPhone: 'Phone must be at least 10 characters.',
  oldMinimumPassword: 'Old password should be at least 6 characters.',
  newMinimumPassword: 'New password should be at least 6 characters.',
  emailAlreadyExist: 'Provided email is already associated with another user.',
  phoneAlreadyExist: 'Provided phone no is already associated with another user.',
  userNotFound: 'The user is not found.',
  userWrongPassword: 'Entered password is invalid, please try again.',
  compareBothPassword: 'New password should be different from old password',
  newUserCreated: 'New user created successfully.',
  updatedUserPassword: 'Password successfully updated.',
  updatedUserProfile: 'Profile successfully updated.',
  userLoginSuccessfully: 'You are successfully logged-in.',
  userLogoutSuccessfully: 'You are Logged-out successfully.',
  updateSuccess: 'User information successfully updated.',
  existUserEmail: 'Provided email address is not exist!',
  invalidToken: 'Invalid token, please login again.',
  accessDenied: 'Access denied. No token provided.',
  notUserAccess: "Access denied. you don't have permission.",
  expireUserToken: 'The token is expired or invalid.',
};

const tax = {
  requireTaxName: 'Tax name should not be blank.',
  maximumTaxName: 'Maximum 60 characters allow for tax name',
  requireTaxCode: 'Tax code should not be blank.',
  maximumTaxCode: 'Maximum 30 characters allow for tax code',
  requireTaxTpye: 'Tax type should not be blank.',
  requireTaxStatus: 'Tax status should not be blank.',
  requireTaxPercent: 'Tax percentage should not be blank.',
  taxAlreadyExist: 'Provided tax is already associated with another item.',
  maximumDesc: 'Maximum 255 characters allow for description',
  newTaxCreated: 'New tax item created successfully.',
};

module.exports = {
  db,
  server,
  user,
  tax,
};
