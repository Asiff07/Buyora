import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';
import redisClient from '../config/redis.js';

//Fnx for adding products
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        )

        //Save to Database
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestseller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }
        console.log(productData);

        const product = new productModel(productData);
        await product.save();
        try {
            await redisClient.del('products:all');
        } catch (err) {
            console.error("Redis cache delete error in addProduct:", err);
        }

        res.json({ success: true, msg: "Product Added Successfully" });
    } catch (err) {
        res.json({ success: false, msg: err.message });
        console.log(err);
    }
}

//Fnx for list products
const listProducts = async (req, res) => {
    try {
        // ---- 1. Validate query params ----
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        if (page < 1) page = 1;
        if (limit < 1 || limit > 50) limit = 10; // prevent abuse

        const skip = (page - 1) * limit;

        const cacheKey = `products:${page}:${limit}`;

        // ---- 2. Check Redis cache ----
        let cachedData = null;
        try {
            cachedData = await redisClient.get(cacheKey);
        } catch (err) {
            console.error("Redis cache read error in listProducts:", err);
        }
        if (cachedData) {
            return res.json({
                success: true,
                ...JSON.parse(cachedData),
                source: "redis"
            });
        }

        // ---- 3. Fetch from DB ----
        const [products, total] = await Promise.all([
            productModel
                .find({})
                .sort({ createdAt: -1 }) // IMPORTANT
                .skip(skip)
                .limit(limit)
                .lean(),

            productModel.countDocuments()
        ]);

        const responseData = {
            products,
            total,
            page,
            pages: Math.ceil(total / limit)
        };

        // ---- 4. Store in Redis ----
        try {
            await redisClient.setEx(cacheKey, 600, JSON.stringify(responseData));
        } catch (err) {
            console.error("Redis cache write error in listProducts:", err);
        }

        // ---- 5. Send response ----
        res.json({
            success: true,
            ...responseData,
            source: "mongodb"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
//Fnx for removing products
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        try {
            await redisClient.del('products:all');
            await redisClient.del(`product:${req.body.id}`);
        } catch (err) {
            console.error("Redis cache delete error in removeProduct:", err);
        }
        res.json({ success: true, msg: "Product Removed Successfully" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, msg: err.message });
    }
}
//Fnx for single product details
const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `product:${id}`;

    let cachedData = null;
    try {
        cachedData = await redisClient.get(cacheKey);
    } catch (err) {
        console.error("Redis cache read error in singleProduct:", err);
    }
    if (cachedData) {
      return res.json({
        success: true,
        product: JSON.parse(cachedData),
        source: 'redis'
      });
    }

    const product = await productModel.findById(id).lean();
    if (!product) {
      return res.status(404).json({ success: false, msg: 'Product Not Found' });
    }

    try {
        await redisClient.setEx(cacheKey, 600, JSON.stringify(product));
    } catch (err) {
        console.error("Redis cache write error in singleProduct:", err);
    }
    res.json({ success: true, product, source: 'mongodb' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
};


export { addProduct, listProducts, removeProduct, singleProduct };