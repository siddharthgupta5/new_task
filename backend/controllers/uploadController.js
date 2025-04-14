const { uploadToS3 } = require('../utils/awsS3');

exports.uploadProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please upload an image file'
      });
    }

    const imageUrl = await uploadToS3(req.file);

    res.status(200).json({
      status: 'success',
      data: {
        imageUrl
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};