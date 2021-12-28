import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    isDecorated: Boolean,
    category: String,
    packageSize: String,
    contactEmail: String,
    tags: String
});

const Product = mongoose.model('Product', productSchema)

export default Product;