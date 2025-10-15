import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // lowercase 'cookies'
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token." });
    }
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in secure route: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default secureRoute;
