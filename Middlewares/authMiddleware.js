import jwt from "jsonwebtoken";
import AppError from "../Utilits/AppError.js";
import { userModel } from "../Models/user.Schema.js";
const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
  if (!token) {
    return next(new AppError("Access denied login required", 401, false));
  }
  const tokenDecode = jwt.verify(token, process.env.JWTKEY);
  const user =await userModel.findById(tokenDecode.userId)
  if(!user){
    return next(new AppError("User not found Please Login", 404, false));
 }
  req.user=user
  next();
  } catch (error) {
    return next(new AppError('Token invalid or expired Login Again',401,false))
  }
};

export { authMiddleware };
