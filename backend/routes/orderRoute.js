import express from 'express';
import { placeOrder, allOrders, userOrders, updateStatus, placeOrderStripe, placeOrderRazorpay, verifyStripe, verifyRazorpay } from '../controllers/orderController.js';
import authUser from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';
import { rateLimiter } from '../middleware/rateLimiter.js';

const orderRouter = express.Router();

const orderLimiter = rateLimiter({
    keyPrefix: 'rate:order',
    limit: 5,
    windowSeconds: 60, // 5 requests per minute (very strict)
});

//Admin Features
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

//Payment Features
orderRouter.post('/place',authUser, orderLimiter, placeOrder);
orderRouter.post('/stripe',authUser, orderLimiter, placeOrderStripe);
orderRouter.post('/razorpay',authUser, orderLimiter, placeOrderRazorpay);

//User Features
orderRouter.post('/userorders',authUser,userOrders);


//verify Stripe payment
orderRouter.post('/verifystripe',authUser, orderLimiter, verifyStripe);
//verify Razorpay payment
orderRouter.post('/verifyrazorpay',authUser, orderLimiter, verifyRazorpay);

export default orderRouter;