import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },

    image: [{ type: String, required: true }], // array of image URLs

    category: { type: String, required: true },
    subCategory: { type: String, required: true },

    sizes: [{ type: String, required: true }],

    bestseller: { type: Boolean, default: false }

}, {
    timestamps: true // adds createdAt & updatedAt automatically
});

// Indexes (VERY IMPORTANT for performance)
productSchema.index({ createdAt: -1 });
productSchema.index({ category: 1 });
productSchema.index({ subCategory: 1 });
productSchema.index({ category: 1, subCategory: 1 });

const productModel =
    mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;