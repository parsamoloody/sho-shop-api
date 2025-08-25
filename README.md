# Shop-Shop API

## Overview
Shop-Shop API is a robust backend for an e-commerce platform, built with **Express.js** and **MongoDB**. It provides APIs for managing products, categories, subcategories, users, and wishlists, supporting CRUD operations, image uploads, and authentication. This API is designed to power an online shopping system with TypeScript for a strongly-typed developer experience.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Management**: Create, read, and update user profiles, including profile pictures and addresses.
- **Product Management**: Manage products with categories, subcategories, pricing, discounts, and images.
- **Category & Subcategory Management**: Organize products into categories and subcategories with associated images.
- **Wishlist**: Allow users to manage their wishlists with products and quantities.
- **Authentication**: Secure API endpoints with authentication middleware.
- **Image Uploads**: Handle image uploads for products and users, stored in a public directory.
- **MongoDB Integration**: Use Mongoose for schema-based data modeling and CRUD operations.

## Technologies
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ORM
- **Environment Management**: dotenv
- **Middleware**: CORS, custom error handling, image upload handling
- **TypeScript**: Strongly-typed JavaScript for better developer experience
- **Node.js**: Runtime environment

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/parsamoloody/sho-shop-api.git
   cd shop-shop-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   WEBHOOK_SECRET_KEY="dfe8c1ca1f201c376384d3422072d134"
   AUTH_SECRET_16_TO_HEX="166121675e40a6967006199ca41d0590"
   EMAIL_USER="your_email@gmail.com"
   EMAIL_PASS="your_app_password"
   PRODUCT_IMAGE_PATH="../../../shop-shop/public/assets/uploads/products"
   USER_IMAGE_PATH="../../../shop-shop/public/assets/uploads/users"
   PUBLIC_IMAGE_PATH="../../../shop-shop/public/assets/uploads/public"
   ```

4. **Run MongoDB**:
   Ensure MongoDB is running locally or provide a MongoDB connection string in the `connectDB` function.

5. **Start the Server**:
   ```bash
   npm start
   ```
   The server will run at `http://localhost:4000`.

## Environment Variables
The application uses the following environment variables:
- `WEBHOOK_SECRET_KEY`: Secret key for webhook validation.
- `AUTH_SECRET_16_TO_HEX`: Secret for authentication token generation.
- `EMAIL_USER`: Email address for sending emails (e.g., password reset).
- `EMAIL_PASS`: App-specific password for the email service.
- `PRODUCT_IMAGE_PATH`: Path to store product images.
- `USER_IMAGE_PATH`: Path to store user profile images.
- `PUBLIC_IMAGE_PATH`: Path to serve public images.

## API Endpoints
The Shop-Shop API exposes the following endpoints:

### Authentication
- `POST /api/auth`: Handle user authentication (login, signup, etc.).

### Products
- `GET /api/product/get-all`: Retrieve all products.
- `GET /api/product/get-one/:id`: Retrieve a single product by ID.
- `POST /api/product`: Create a new product (with image upload).
- `PUT /api/product/edit/:id`: Update an existing product.

### Categories
- `GET /api/category/get-all`: Retrieve all categories.
- `GET /api/category/get-one/:id`: Retrieve a single category by ID.
- `POST /api/category/create`: Create a new category.
- `PATCH /api/category/edit/:id`: Update an existing category.

### Subcategories
- `GET /api/subcategory/get-all`: Retrieve all subcategories.
- `GET /api/subcategory/get-one/:id`: Retrieve a single subcategory by ID.
- `POST /api/subcategory/create`: Create a new subcategory.
- `PATCH /api/subcategory/edit/:id`: Update an existing subcategory.

### Users
- `GET /api/user/get-all`: Retrieve all users.
- `GET /api/user/get-one/:id`: Retrieve a single user by ID.
- `PUT /api/user/edit/:id`: Update an existing user (with image upload).

### Wishlist
- `GET /api/wishlist`: Retrieve wishlist data.
- `POST /api/wishlist`: Create or update wishlist items.

### Articles/Posts
- `GET /api/post`: Retrieve articles or posts.

### Image Upload
- `GET /api/upload/image`: Serve uploaded images from the public directory.

## Project Structure
```plaintext
shop-shop-api/
├── lib/
│   └── connection.ts       # MongoDB connection setup
├── middlewares/
│   ├── errorHandler.ts    # Custom error handling middleware
│   └── imageHandler.ts    # Image upload middleware
├── router/
│   ├── auth.route.ts      # Authentication routes
│   ├── article.route.ts   # Article/post routes
│   ├── product.route.ts   # Product routes
│   ├── category.route.ts  # Category routes
│   ├── subCategory.route.ts # Subcategory routes
│   ├── user.route.ts      # User routes
│   └── wish.router.ts     # Wishlist routes
├── factory/
│   └── resolveFactory.ts  # Factory for resolving controllers
├── utils/
│   └── crudFactory.ts     # Generic CRUD controller factory
├── public/
│   └── assets/uploads/    # Directory for uploaded images
├── .env                   # Environment variables
├── index.ts               # Main application entry point
└── README.md              # Project documentation
```

## Usage
1. **Start the Server**:
   Run `npm start` to launch the server. It will connect to MongoDB and listen on port 4000.

2. **Test APIs**:
   Use tools like Postman or cURL to test the API endpoints. For example:
   ```bash
   curl http://localhost:4000/api/product/get-all
   ```

3. **Image Uploads**:
   Send a `POST` request to `/api/product` or `/api/user` with a multipart form-data payload to upload images.

4. **Authentication**:
   Use `/api/auth` to authenticate users and obtain tokens for protected routes.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License
This project is licensed under the MIT License.