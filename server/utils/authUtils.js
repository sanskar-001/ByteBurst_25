const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * Generate JWT token for user
 * @param {string} userId - User ID
 * @returns {string} JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

/**
 * Generate random token for email verification or password reset
 * @param {number} length - Token length (default: 32)
 * @returns {string} Random token
 */
const generateRandomToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Hash token using SHA256
 * @param {string} token - Token to hash
 * @returns {string} Hashed token
 */
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

/**
 * Create user response object without sensitive data
 * @param {Object} user - User object from database
 * @param {string} token - JWT token
 * @returns {Object} User response object
 */
const createUserResponse = (user, token) => {
  const userResponse = {
    _id: user._id,
    email: user.email,
    displayName: user.displayName,
    phone: user.phone,
    address: user.address,
    profilePicture: user.profilePicture,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
    lastLogin: user.lastLogin,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };

  if (token) {
    userResponse.token = token;
  }

  return userResponse;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
const isValidEmail = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid and message
 */
const validatePassword = (password) => {
  const minLength = 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return {
      isValid: false,
      message: `Password must be at least ${minLength} characters long`
    };
  }

  if (!hasUpperCase || !hasLowerCase) {
    return {
      isValid: false,
      message: 'Password must contain both uppercase and lowercase letters'
    };
  }

  if (!hasNumbers) {
    return {
      isValid: false,
      message: 'Password must contain at least one number'
    };
  }

  if (!hasSpecialChar) {
    return {
      isValid: false,
      message: 'Password must contain at least one special character'
    };
  }

  return {
    isValid: true,
    message: 'Password is strong'
  };
};

/**
 * Sanitize user input
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Generate secure password reset token
 * @returns {Object} Token object with token and hashedToken
 */
const generatePasswordResetToken = () => {
  const resetToken = generateRandomToken(32);
  const hashedToken = hashToken(resetToken);
  
  return {
    resetToken,
    hashedToken
  };
};

/**
 * Generate email verification token
 * @returns {Object} Token object with token and hashedToken
 */
const generateEmailVerificationToken = () => {
  const verificationToken = generateRandomToken(32);
  const hashedToken = hashToken(verificationToken);
  
  return {
    verificationToken,
    hashedToken
  };
};

module.exports = {
  generateToken,
  generateRandomToken,
  hashToken,
  createUserResponse,
  isValidEmail,
  validatePassword,
  sanitizeInput,
  generatePasswordResetToken,
  generateEmailVerificationToken
}; 