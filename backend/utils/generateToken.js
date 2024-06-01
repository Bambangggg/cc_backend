import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (UserId, res) => {
  const token = jwt.sign({ UserId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  console.log(token);

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS,
    httpOnly: true, //prevet XSS attacks cross-site scripting attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
