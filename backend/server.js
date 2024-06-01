import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import sellerAuth from "./routes/seller.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import getmessageclientRoutes  from "./routes/getmessageclient.routes.js";
import { app, server } from "./socket/socket.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

const PORT = process.env.PORT || 5000;

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/api/uploads", express.static(path.join(__dirname, "uploads/")));

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/auth/seller", sellerAuth);
app.use("/api/messages/client", messageRoutes);
app.use("/api/messages", getmessageclientRoutes);
app.use("/api/users", userRoutes);
app.use("/api/", doctorRoutes);
app.use("/api/", paymentRoutes);
app.use("/api/", blogRoutes);
// app.use("/api/product", '')

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
