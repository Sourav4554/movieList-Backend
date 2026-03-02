import jwt from "jsonwebtoken";
import AppError from "../Utilits/AppError.js";

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
  if (!token) {
    return next(new AppError("Not Autherized", 401, false));
  }
  const tokenDecode = jwt.verify(token, process.env.JWTKEY);
  req.userId = tokenDecode.id
  next();
  } catch (error) {
    return next(new AppError('Token invalid or expired Login Again',401,false))
  }
};

export { authMiddleware };
