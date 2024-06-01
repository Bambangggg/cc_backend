import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(token)

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, 'bZR3pJpJctfOa3NGpst0SXAfEM+TABOZszLfYUo3puU=');

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.UserId).select("-password");

    if (!user) {
      console.log("User not found in database:", decoded.userId);
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    console.log("Authenticated user:", user);

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
