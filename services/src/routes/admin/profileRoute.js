const express = require('express');
const authToken = require('../../middleware/authenticate');
const uploadMedia = require('../../middleware/upload');
const roles = require('../../middleware/role');
const profile = require('../../controller/admin/profileController');

const router = express.Router();
router.get('/me', authToken, profile.userProfile);
router.get('/members', authToken, profile.membersProfile);
router.patch(
  '/update-profile-image',
  authToken,
  uploadMedia.single('profileImage'),
  profile.updateProfileImage,
);
router.post(
  '/approve-user',
  authToken,
  roles('super_admin', 'admin'),
  profile.approvalUsers,
);
router.post(
  '/user-status',
  authToken,
  roles('super_admin', 'admin'),
  profile.updateUserActiveStatus,
);

module.exports = router;
