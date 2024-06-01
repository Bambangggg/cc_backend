import mongoose from "mongoose";

const sellerProductSchema = mongoose.Schema({
  title: {required: true, type: String},
  description: {required: true, type: String},
  price: {required: true, type: Number},
  category: {enum: ["Vitamin", "Makanan Kering", "Makanan Basah", "Bukan Makanan"], type:String},
  cover: String,
  seller: {type: mongoose.Schema.Types.ObjectId, ref: "Seller"},
});

const Product = mongoose.model("Product", sellerProductSchema);
export default Product;
