import Seller from "../models/seller.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { businessname, phone, type, address, email, password } = req.body;
    const EmailAccunt = await Seller.findOne({ email });
    if (EmailAccunt) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newSeller = await new Seller({
      businessname,
      phone,
      type,
      address,
      email,
      password: hashedPassword,
    });

    if (newSeller) {
      generateTokenAndSetCookie(newSeller._id, res);
      await newSeller.save();
      res.status(201).json({
        _id: newSeller._id,
        email: newSeller.email,
        businessname: newSeller.businessname,
        phone: newSeller.phone,
      });
    } else {
      res.status(400).json({ error: "Invalid seller data" });
    }
  } catch (err) {
    console.log("Error in seller controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.query;
    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, seller.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(seller._id, res);
    res.status(200).json({
      _id: seller._id,
      businessname: seller.businessname,
      email: seller.email,
    });
  } catch (err) {
    console.error("Error in seller controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(500).json({ Message: "Logged Out Successfully" });
  } catch (error) {
    console.log("Error in seller Controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
