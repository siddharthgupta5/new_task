const AWS = require('aws-sdk');
const config = require('../config/config');

// Check if AWS credentials are available
if (!config.AWS_ACCESS_KEY_ID || !config.AWS_SECRET_ACCESS_KEY) {
  console.warn('AWS credentials are not configured. File uploads will not work.');
}

// Configure AWS
const s3 = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION
});

exports.uploadToS3 = async (file) => {
  if (!file || !file.buffer) {
    throw new Error('Invalid file object');
  }

  const params = {
    Bucket: config.S3_BUCKET_NAME,
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read'
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (err) {
    console.error('S3 Upload Error:', err);
    throw new Error('Failed to upload file to S3');
  }
};