import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

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

        res.json({ success: true, msg: "Product Added Successfully" });
    } catch (err) {
        res.json({ success: false, msg: err.message });
        console.log(err);
    }
}

//Fnx for list products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (err) {
        console.log(err);
        res.json({ success: false, msg: err.message });
    }
}
//Fnx for removing products
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, msg: "Product Removed Successfully" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, msg: err.message });
    }
}
//Fnx for single product details
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, msg: err.message });
    }
}

export { addProduct, listProducts, removeProduct, singleProduct };