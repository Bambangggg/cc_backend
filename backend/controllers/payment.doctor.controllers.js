import { request } from "express";
import Midtrans from "midtrans-client";

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-0SnHBJnx4Rl1XS8gps6xFA4a",
  clientKey: "SB-Mid-client-uBscz0so8GOjZjh8",
});

export const createTransaction = async (req, res) => {
  try {
    const { id, total } = req.body;

    // Validate total
    const parsedTotal = parseFloat(total);
    if (isNaN(parsedTotal) || parsedTotal <= 0) {
      return res.status(400).json({ error: "Invalid total amount" });
    }

    // Generate unique order ID
    function generateRandomId(length) {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      return result;
    }

    const orderId = generateRandomId(5);

    let parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: parsedTotal,
      },
    };

    const token = await snap.createTransactionToken(parameter);
    console.log(token);
    res.status(200).json({ token: token });
  } catch (error) {
    console.error("Error in createTransaction controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const paymentTrasaction = async (req, res) => {
  try {
    const { id, products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid products array" });
    }

    let parsedTotal = 0;
    const itemDetails = products.map((product) => {
      const { productName, price, quantity } = product;


      const productPrice = parseFloat(price);
      const productQuantity = parseInt(quantity, 10);

      if (
        isNaN(productPrice) ||
        isNaN(productQuantity) ||
        productQuantity <= 0
      ) {
        throw new Error("Product price or quantity is invalid");
      }

      parsedTotal += productPrice * productQuantity;

      return {
        name: productName,
        price: productPrice,
        quantity: productQuantity,
      };
    });

    if (parsedTotal <= 0) {
      return res.status(400).json({ error: "Invalid total amount" });
    }

    // Generate unique order ID
    function generateRandomId(length) {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      return result;
    }

    const orderId = generateRandomId(5);

    let parameter = {
      item_details: itemDetails,
      transaction_details: {
        order_id: orderId,
        gross_amount: parsedTotal,
      },
    };

    const token = await snap.createTransactionToken(parameter);
    console.log(token);
    res.status(200).json({ token: token });
  } catch (error) {
    console.error("Error in createTransaction controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
