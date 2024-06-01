import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
    minlenght: 6,
  },
  username: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  roles: {
    type: String,
    enum: ["Doctor", "Patient"],
    required: true,
  },
  workExperience: {
    type: String,
  },
  Picture: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
