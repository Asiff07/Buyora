import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App Config 
const app = express();
connectDB();
connectCloudinary();

//Middlewares
app.set('trust proxy', 1); // Trust first proxy (Nginx) for correct client IP detection
app.use(express.json());
app.use(cors());

// Global Rate Limiting using Redis (Relaxed: 500 requests per 15 minutes for browsing catalog)
import { rateLimiter } from './middleware/rateLimiter.js';
app.use(rateLimiter({
    keyPrefix: 'global-api',
    limit: 500,
    windowSeconds: 15 * 60
}));

// API Endpoints
app.use('/api/users', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
    res.send("Api Working!")
});

export default app;
