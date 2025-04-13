const express = require('express');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.route('/')
  .get(profileController.getProfile)
  .patch(
    uploadMiddleware.uploadUserPhoto,
    profileController.updateProfile
  );

module.exports = router;