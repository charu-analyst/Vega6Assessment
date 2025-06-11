Vega Blog Platform - Backend API Documentation
Overview
The Vega Blog Platform is a RESTful API backend service that powers a blogging platform with user authentication, blog management, and comment functionality. The API is built with Node.js, Express.js, and MongoDB, with Cloudinary for image storage.

Key Features
User authentication (signup, login,getProfile)

Blog creation,getting, editing, and deletion

Secure image uploads with Cloudinary

JWT-based authentication

Comprehensive error handling

API Endpoints
Authentication Routes (/vega/api/user)
POST /SignUp - Create a new user account

POST /userLogin - Authenticate and login user

GET /getUserProfile - Get current user profile (protected)

PUT /editUserProfile - Update user profile (protected)

PUT /deleteUserProfile - Delete user account (protected)

Blog Routes (/vega/api/blog)
POST /createBlog - Create a new blog post (protected)

GET /getBlogList - Get list of all active blogs

GET /getBlogById - Get single blog by ID

PUT /editBlog - Edit existing blog (protected)

PUT /deleteBlog - Delete blog (protected)

Image Handling with Cloudinary
The system uses Cloudinary for secure image storage with the following benefits:

Base64 Image Upload:

Images are converted to Base64 on the client side

Secure upload to Cloudinary via API

Returns optimized CDN URL for fast delivery

Benefits:

Reduced server storage requirements

Automatic image optimization and transformations

Secure storage with access control

Implementation:

javascript
const url = await commonFunction.getSecureUrl(image); // Converts Base64 to Cloudinary URL
Database Models
User Model
email (String)

password (String, hashed)

image (String, Cloudinary URL)

status (Enum: ACTIVE, BLOCKED, DELETE)

Blog Model
title (String)

description (String)

blogImage (String, Cloudinary URL)

userId (ObjectId, reference to User)

comments (Array of ObjectId, reference to Comments)

status (Enum: ACTIVE, BLOCKED, DELETE)

Comment Model
blogId (ObjectId, reference to Blog)

userId (ObjectId, reference to User)

comment (String)

status (Enum: ACTIVE, BLOCKED, DELETE)

Response Codes and Messages
The API uses standardized response codes and messages (defined in responseCode.js and responseMessages.js), including:

200 OK: Successful requests

201 Created: Resource created successfully

400 Bad Request: Invalid input

401 Unauthorized: Authentication required

403 Forbidden: Insufficient permissions

404 Not Found: Resource not found

409 Conflict: Resource already exists

500 Internal Server Error: Server-side error

Setup Instructions
Install dependencies:

command:
npm install
Configure environment variables:

Create a .env file with:

text
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
PORT=8090
Start the server:

command:
npm start


Security Features
Password hashing with bcrypt

JWT authentication with protected routes

Input validation with Joi

Secure image handling

Status-based soft deletion

Error Handling
The API provides meaningful error messages with appropriate status codes. All endpoints are wrapped in try-catch blocks to handle errors gracefully.

Rate Limiting
Consider implementing rate limiting for production use to prevent abuse (not currently implemented in this version).

Future Enhancements
Implement pagination for blog listings

Add user roles and permissions

Implement rate limiting

Add email verification for signups

Implement password reset functionality

Add blog categories and tags

Enhance comment system with replies

Dependencies
Express.js

Mongoose (MongoDB ODM)

Joi (validation)

bcrypt (password hashing)

jsonwebtoken (authentication)

Cloudinary (image storage)
