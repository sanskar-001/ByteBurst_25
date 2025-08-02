# E-Waste Management System Backend

A custom Node.js backend for the E-Waste Management System, replacing Firebase authentication with a custom solution using MongoDB and JWT.

## Features

- **User Authentication**: Registration, login, logout
- **Password Management**: Reset password functionality
- **User Profiles**: Update profile information
- **Security**: JWT tokens, password hashing, rate limiting
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Input validation and sanitization

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. **Install dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Set up environment variables**:
   - Copy `config.env` and modify the values as needed
   - Update `MONGODB_URI` to point to your MongoDB instance
   - Change `JWT_SECRET` to a secure random string

3. **Start MongoDB**:
   - If using local MongoDB: `mongod`
   - If using MongoDB Atlas: Use the connection string

4. **Run the server**:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Send password reset email
- `POST /api/auth/reset-password/:token` - Reset password with token
- `GET /api/auth/me` - Get current user

### User Management

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/password` - Change password
- `DELETE /api/user/account` - Delete account
- `GET /api/user/stats` - Get user statistics

### Health Check

- `GET /api/health` - Server health status

## Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/ewaste_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5175

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Security Features

- **Password Hashing**: Using bcryptjs with salt rounds of 12
- **JWT Tokens**: Secure token-based authentication
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Comprehensive validation using express-validator
- **Input Sanitization**: Prevents XSS attacks
- **Account Locking**: Temporary lock after failed login attempts
- **CORS Protection**: Configured for specific origins

## Database Schema

### User Model

```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  displayName: String (required),
  phone: String (optional),
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  profilePicture: String,
  role: String (enum: ['user', 'admin']),
  isEmailVerified: Boolean,
  isActive: Boolean,
  lastLogin: Date,
  loginAttempts: Number,
  lockUntil: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend Integration

The frontend has been updated to use this custom backend instead of Firebase. The authentication service (`src/services/auth.service.js`) handles all API calls to this backend.

## Development

### Running in Development Mode

```bash
npm run dev
```

This will start the server with nodemon for automatic restarts on file changes.

### Testing the API

You can test the API endpoints using tools like:
- Postman
- Insomnia
- curl commands

Example registration request:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!",
    "displayName": "Test User"
  }'
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure MongoDB Atlas or production MongoDB instance
4. Set up proper CORS origins
5. Use environment variables for all sensitive data
6. Consider using PM2 or similar process manager

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**: Ensure MongoDB is running and the connection string is correct
2. **JWT Secret Error**: Make sure JWT_SECRET is set in environment variables
3. **CORS Error**: Check that CORS_ORIGIN matches your frontend URL
4. **Port Already in Use**: Change the PORT in config.env

### Logs

The server uses Morgan for HTTP request logging. Check the console output for detailed logs.

## License

MIT License 