import express from "express";
import { registerUser, loginUser, adminLogin } from "../controllers/userController.js";
import { rateLimiter } from "../middleware/rateLimiter.js";


const userRouter = express.Router();

//5 requests per minute for registration
userRouter.post('/register',rateLimiter({
    keyPrefix: 'rate:register',
    limit: 5,
    windowSeconds: 60, 
}), registerUser);

//10 requests per minute for login
userRouter.post('/login', rateLimiter({
    keyPrefix: 'rate:login',
    limit: 5,
    windowSeconds: 60,
}) ,loginUser);

userRouter.post('/admin', rateLimiter({
    keyPrefix: 'rate:adminLogin',
    limit: 3,
    windowSeconds: 60,
}) ,adminLogin);

export default userRouter;