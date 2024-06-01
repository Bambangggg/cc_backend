import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctor_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  },
  gross_amount
});
