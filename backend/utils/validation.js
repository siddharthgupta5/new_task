const validator = require('validator');
const { check, validationResult } = require('express-validator');

exports.validateRegisterInput = [
  check('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters')
    .trim()
    .escape(),
  
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
    
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character')
];

exports.validateLoginInput = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
    
  check('password')
    .notEmpty()
    .withMessage('Password is required')
];

exports.validateTaskInput = [
  check('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title must be less than 100 characters')
    .trim()
    .escape(),
    
  check('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters')
    .trim()
    .escape()
];

exports.validateProfileUpdate = [
  check('username')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters')
    .trim()
    .escape(),
    
  check('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio must be less than 500 characters')
    .trim()
    .escape()
];

exports.validateResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      errors: errors.array()
    });
  }
  next();
};

exports.isValidEmail = (email) => {
  return validator.isEmail(email);
};

exports.isStrongPassword = (password) => {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  });
};