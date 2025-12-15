import express from 'express';
import { addProduct, removeProduct, singleProduct, listProducts } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
import { rateLimiter } from '../middleware/rateLimiter.js';

const productRouter = express.Router();

productRouter.post('/add',adminAuth, rateLimiter({
    keyPrefix: 'rate:addProduct',
    limit: 5,
    windowSeconds: 60,
}) ,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]), addProduct);

productRouter.post('/remove',adminAuth, removeProduct);
productRouter.get('/list', listProducts);
productRouter.get('/:id', singleProduct);

export default productRouter;