const express = require('express');
const uploadController = require('../controllers/uploadController');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post('/profile-picture', 
  uploadMiddleware.uploadUserPhoto,
  uploadController.uploadProfilePicture
);

module.exports = router;