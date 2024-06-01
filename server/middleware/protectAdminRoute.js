import  jwt  from "jsonwebtoken";
import User from "../Models/User.js";

const protectAdminRoute = async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
  
      if (!token) {
        return res.status(401).json({ error: "Unauthorized - No Token Provided" });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      if (!decoded) {
        return res.status(401).json({ error: "Unauthorized - Invalid Token" });
      }
  
      const user = await User.findById(decoded.userId).select("-password");
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      if (!user.isAdmin) {
        return res.status(403).json({ error: "Forbidden - Not an Admin" });
      }
  
      req.user = user;
  
      next();
    } catch (error) {
      console.log("Error in protectAdminRoute middleware: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  export default protectAdminRoute;