const express = require('express');
const { validReq } = require('../../middleware/validate');
const { admin_signup_validate } = require('../../validate');
const authenticate = require('../../controller/admin/auth_controller');

const router = express.Router();
router.post(
  '/signup',
  validReq(admin_signup_validate),
  authenticate.userSignup,
);
// router.post('/signup', authValid(auth.userInfoSchema), authenticate.userSignup);
// router.post('/signout', authenticate.userSignout);
// router.post('/refresh-token', authenticate.refreshToken);
// router.get('/sessions', authenticate.getActiveSessions);

module.exports = router;
