import Product from "../models/product.seller.model";

export default addProduct = async (req, res) => {
  try {
    const { userId, productName, image, description, qty, price } = req.query;
    const product = new SellerProduct({
      userId,
      productName,
      image,
      description,
      qty,
      price,
    });

    if (product) {
      await product.save();
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        Picture: newUser.Picture,
        message: `Produk baru telah di tambah!`,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {}
};
