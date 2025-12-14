import express from 'express';
import { placeOrder, allOrders, userOrders, updateStatus, placeOrderStripe, placeOrderRazorpay, verifyStripe, verifyRazorpay } from '../controllers/orderController.js';
import authUser from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const orderRouter = express.Router();

//Admin Features
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

//Payment Features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

//User Features
orderRouter.post('/userorders',authUser,userOrders);


//verify Stripe payment
orderRouter.post('/verifystripe',authUser,verifyStripe);
//verify Razorpay payment
orderRouter.post('/verifyrazorpay',authUser,verifyRazorpay);

export default orderRouter;