const express = require('express');
const { validReq } = require('../../middleware/validate');
const {
  admin_signup_validate,
  admin_signin_validate,
} = require('../../validate');
const authenticate = require('../../controller/admin/auth_controller');

const router = express.Router();
router.post(
  '/signup',
  validReq(admin_signup_validate),
  authenticate.userSignup,
);
router.post(
  '/signin',
  validReq(admin_signin_validate),
  authenticate.userSignin,
);
router.post('/refresh-token', authenticate.refreshAccessToken);
router.post('/signout-session', authenticate.signOutSession);
router.get('/sessions', authenticate.getActiveSessions);
router.post('/signout', authenticate.userSignout);

module.exports = router;
