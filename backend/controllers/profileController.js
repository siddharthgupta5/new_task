const User = require('../models/User');
const { uploadToS3 } = require('../utils/awsS3');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { username, bio } = req.body;
    const updateData = { username, bio };

    if (req.file) {
      const imageUrl = await uploadToS3(req.file);
      updateData.profilePicture = imageUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};