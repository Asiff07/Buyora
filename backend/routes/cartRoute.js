import express from 'express';
import { addToCart,getUserCart,updateCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';
import { rateLimiter } from '../middleware/rateLimiter.js';

const cartRouter = express.Router();

const cartLimiter = rateLimiter({
    keyPrefix: 'rate:cart',
    limit: 20,
    windowSeconds: 60, // 20 requests per minute
});

cartRouter.post('/add', authUser, cartLimiter, addToCart);
cartRouter.post('/update', authUser, cartLimiter, updateCart);
cartRouter.post('/get', authUser, cartLimiter, getUserCart);

export default cartRouter;