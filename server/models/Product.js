import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  OfferPrice: {
    type: Number,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
}, {timestamps: true});

const Product = mongoose.models.product || mongoose.model("product", productSchema);

export default Product;