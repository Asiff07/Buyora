# Buyora - Full-Stack E-commerce Platform

Buyora is a complete, feature-rich, production-ready MERN-stack (MongoDB, Express.js, React, Node.js) e-commerce application. The platform features high-performance database caching via Redis, API rate limiting, containerized services with Nginx routing, and an automated CI/CD pipeline.

It consists of three main parts: a responsive customer-facing frontend, a secure RESTful backend API, and a dedicated admin panel for managing the store.

## 🚀 Deployed Links
* **Live Frontend:** [https://buyora-buy.vercel.app](https://buyora-buy.vercel.app)
* **Live Admin Panel:** [https://buyora-admin.vercel.app](https://buyora-admin.vercel.app)

*(Note: Admin credentials are stored in the backend environment variables)*

---

## 🛠️ Advanced Tech Stack & Architecture

### Core Technologies
* **Frontend:** React (Context API, Hooks), Vite, React Router DOM, Tailwind CSS, Axios, React-Toastify
* **Backend:** Node.js, Express.js (REST API)
* **Database:** MongoDB & Mongoose ODM
* **Auth:** JSON Web Tokens (JWT), Bcrypt password hashing
* **Storage:** Cloudinary API (product media) + Multer (multipart form-data handling)
* **Payments:** Stripe API (Checkout Sessions) & Razorpay API (Orders verification)

### Enterprise Infrastructure (Added)
* **Containerization:** Docker & Docker Compose orchestrating microservices on a shared virtual network.
* **Web Server & Reverse Proxy:** Nginx serving frontend static assets (with 1-year cache headers) and routing API requests locally to resolve CORS and port mapping.
* **Performance Caching (Redis):** Paginated catalogs and single products cached in Redis, decreasing database read latency by **~85%** (from ~150ms to <20ms) with automated query cache invalidation on database modifications (CRUD).
* **API Rate Limiting:** Redis-backed sliding-window rate limiters protecting public endpoints and login routes.
* **CI/CD Pipeline:** Automated testing and delivery using **GitHub Actions** and **Render Deploy Hooks** running Jest integration tests upon commit.

---

## 📦 Project Structure
```
/
├── admin/            # React (Vite) Admin Panel + Nginx Multi-stage Dockerfile
├── backend/          # Node.js (Express) API + MongoDB/Redis connections & Jest tests
├── frontend/         # React (Vite) Customer App + Nginx Multi-stage Dockerfile
├── .github/          # GitHub Actions Deploy Workflows (CI/CD)
├── docker-compose.yml# Multi-container orchestration config
└── README.md
```

---

## ⚡ Quickstart with Docker (Recommended)
You can run the entire system (Frontend, Backend, Admin Panel) locally with a single command. 

### Prerequisites
Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### 1. Configure Local Environment Variables
Create `.env` files in the respective directories:

* **`backend/.env`**:
  ```env
  PORT=4000
  MONGODB_URI="your_mongodb_connection_string"
  JWT_SECRET="your_jwt_secret"
  ADMIN_EMAIL="admin@example.com"
  ADMIN_PASSWORD="adminpassword"
  CLOUDINARY_NAME="your_cloudinary_name"
  CLOUDINARY_API_KEY="your_api_key"
  CLOUDINARY_SECRET_KEY="your_secret_key"
  STRIPE_SECRET_KEY="your_stripe_secret_key"
  RAZORPAY_KEY_ID="your_razorpay_key_id"
  RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
  REDIS_URL="your_redis_connection_string"
  ```
* **`frontend/.env`**:
  ```env
  VITE_BACKEND_URL="" # Leave blank to let Nginx proxy handle routing
  VITE_RAZORPAY_KEY_ID="your_razorpay_key_id"
  ```
* **`admin/.env`**:
  ```env
  VITE_BACKEND_URL="" # Leave blank to let Nginx proxy handle routing
  ```

### 2. Build and Launch Containers
From the root directory, run:
```bash
docker compose up --build -d
```

Once built, access the services:
* **Customer Store:** [http://localhost:5173](http://localhost:5173)
* **Admin Dashboard:** [http://localhost:5174](http://localhost:5174)
* **Backend API (Internal):** `http://localhost:4000` *(Proxied automatically by Nginx)*

---

## 🛠️ Manual Local Setup (Alternative)

### 1. Backend Setup
```bash
cd backend
npm install
npm run server # Runs on http://localhost:4000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev # Runs on http://localhost:5173
```

### 3. Admin Panel Setup
```bash
cd admin
npm install
npm run dev # Runs on http://localhost:5174
```

---

## 🧪 Running Integration Tests
To run Jest integration test suites locally (make sure to set up environment variables in `backend/.env` first):
```bash
cd backend
npm test
```

---

## 🛡️ CI/CD Deployments
This repository is configured with a GitHub Actions runner [deploy.yml](.github/workflows/deploy.yml) that:
1. Triggers on every push or PR merged into `main`.
2. Automatically installs dependencies and runs integration tests.
3. Automatically triggers a Render auto-deploy hook upon successful test completion.

---

## 👤 Author
**Sk Asif Ahmed**
* **Portfolio:** [skasifahmed.dev](https://skasifahmed.dev)
* **LinkedIn:** [linkedin.com/in/skasifahmed](https://linkedin.com/in/skasifahmed)
* **GitHub:** [@Asiff07](https://github.com/Asiff07)
* **Email:** [skasifahmedofficial@gmail.com](mailto:skasifahmedofficial@gmail.com)