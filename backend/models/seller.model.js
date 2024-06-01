import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  businessname: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  type: {
    type: String,
    enum: ["Petshop", "Apoteker"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Seller = mongoose.model("Seller", sellerSchema)
export default Seller;