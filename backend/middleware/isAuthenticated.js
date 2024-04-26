const { verifyJwtToken } = require("../utils/JwtHandle");
const User = require("../models/user");
const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "You are not authenticated" });
  }
  try {
    const jwtToken = token.split("Bearer ")[1];
    const payload = verifyJwtToken(jwtToken);
    const user = await User.findOne({ _id: payload.userId }, "-password");
    if (!user) {
      return res.status(401).json({ message: "You are not authenticated" });
    }
    req.user = user;
  } catch (error) {
    return res.status(401).json({ message: "You are not authenticated" });
  }

  next();
};
module.exports = isAuthenticated;
