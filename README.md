# Buyora - Full-Stack E-Commerce Platform
Buyora is a complete, feature-rich MERN-stack (MongoDB, Express.js, React, Node.js) e-commerce application. It consists of three main parts: a responsive customer-facing frontend, a secure RESTful backend API, and a dedicated admin panel for managing the store.

# Deployed Links
    Live Frontend: https://buyora-buy.vercel.app
    Live Admin Panel: https://buyora-admin.vercel.app

(Note: Admin credentials are stored in the backend environment variables)




# Project Showcase


<img width="1919" height="920" alt="Screenshot 2025-11-01 005546" src="https://github.com/user-attachments/assets/c2f576b4-2835-450f-85b2-f0fd6870b053" />





# Features

🛒 Frontend (Client-Side)

Full Browsing Experience: View products by category, sub-category, or as a "bestseller" collection.
Search & Filter: Search for products by name and filter by category (Men, Women, Kids) and type (Topwear, Bottomwear, Winterwear).
Sort Products: Sort collections by relevance, price (low-to-high), or price (high-to-low).
User Authentication: Secure JWT-based user registration and login.
Dynamic Shopping Cart: Add/remove items, update quantities, and view cart totals. The cart is persistent and synced with the user's account.
Product Details: View detailed product information, select sizes, and see multiple product images.
Multi-Step Checkout: Secure checkout process with delivery information form.
Multiple Payment Gateways: Integrated Stripe, Razorpay, and Cash on Delivery (COD) options.
Order History: Users can view their past orders and track their status.

🔐 Admin Panel

Secure Admin Login: Separate, secure login for the administrator.
Product Management (CRUD):
Add Products: Add new products with multiple images, name, description, price, category, sizes, and a "bestseller" flag.
View Products: See a list of all products in the database.
Remove Products: Remove products from the store.
Cloud Image Uploads: Product images are uploaded directly to Cloudinary via the backend.


Order Management:

View all orders from all users.
Update the status of any order (e.g., "Order Placed", "Packing", "Shipped", "Delivered").


📡 Backend (Server-Side API)

RESTful API: A secure Express.js API serves all data to the frontend and admin panel.
Database: MongoDB with Mongoose for structured data models (User, Product, Order).
Authentication: JWT and bcrypt for secure password hashing and token-based authentication/authorization.
Payment Integration: Server-side logic to create payment sessions for Stripe and Razorpay and verify payment status.
Image Handling: Uses multer for handling multipart/form-data and uploads images to Cloudinary.


## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React (Hooks, Context API), Vite, `react-router-dom`, Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (with Mongoose) |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt |
| **File Storage** | Cloudinary (for product images), Multer |
| **Payment** | Stripe, Razorpay |
| **Deployment** | Vercel (for Frontend, Backend, and Admin) |




## Project Structure
```
/
├── admin/         # React (Vite) Admin Panel
│   ├── src/
│   │   ├── pages/   # Add, List, Orders
│   │   └── ...
│   └── vercel.json
│
├── backend/       # Node.js (Express) API
│   ├── config/    # MongoDB & Cloudinary connection
│   ├── controllers/ # Business logic
│   ├── middleware/  # Auth (user & admin), Multer
│   ├── models/      # Mongoose schemas (User, Product, Order)
│   ├── routes/      # API endpoints
│   ├── server.js    # Server entry point
│   └── vercel.json
│
└── frontend/      # React (Vite) Client App
    ├── src/
    │   ├── components/
    │   ├── context/   # ShopContext (Global State)
    │   ├── pages/     # Home, Product, Cart, Login, etc.
    │   └── ...
    └── vercel.json
```
Getting Started

To run this project locally, you will need to set up all three parts: backend, frontend, and admin.

# BACKEND SETUP

# 1. Clone the repository
    git clone https://github.com/Asiff07/Buyora.git
    cd Buyora/backend

# 2. Install dependencies
   npm install

# 3. Create a .env file in the /backend folder and add your variables
    touch .env

# 4. Start the server
    npm run server



# Frontend Setup

# 1. Open a new terminal and navigate to the frontend
    cd ../frontend

# 2. Install dependencies
    npm install

# 3. Create a .env file in the /frontend folder
    touch .env

# 4. Start the frontend dev server (usually on http://localhost:5173)
    npm run dev



# Admin Panel Setup

# 1. Open a third terminal and navigate to the admin panel
    cd ../admin

# 2. Install dependencies
    npm install

# 3. Create a .env file in the /admin folder
    touch .env

# 4. Start the admin dev server (usually on http://localhost:5174)
    npm run dev



# Environment Variables
You must create .env files in the backend, frontend, and admin directories for the project to run.\


# backend/.env
    PORT=4000
    MONGODB_URI="your_mongodb_connection_string"
    JWT_SECRET="your_strong_jwt_secret"

# Admin credentials for /api/users/admin
    ADMIN_EMAIL="admin@example.com"
    ADMIN_PASSWORD="adminpassword"

# Cloudinary (for image uploads)
    CLOUDINARY_NAME="your_cloudinary_cloud_name"
    CLOUDINARY_API_KEY="your_cloudinary_api_key"
    CLOUDINARY_SECRET_KEY="your_cloudinary_secret_key"

# Payment Gateways
    STRIPE_SECRET_KEY="your_stripe_secret_key"
    RAZORPAY_KEY_ID="your_razorpay_key_id"
    RAZORPAY_KEY_SECRET="your_razorpay_key_secret"


# frontend/.env
    VITE_BACKEND_URL="http://localhost:4000"
    VITE_RAZORPAY_KEY_ID="your_razorpay_key_id"



#  admin/.env
VITE_BACKEND_URL="http://localhost:4000"




# Author
    Sk Asif Ahmed

    Portfolio: skasifahmed.dev
    LinkedIn: linkedin.com/in/skasifahmed
    GitHub: @Asiff07
    Email: skasifahmedofficial@gmail.com
