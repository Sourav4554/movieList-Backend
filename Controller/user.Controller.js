import { userModel } from "../Models/user.Schema.js";
import AppError from "../Utilits/AppError.js";
import bcrypt from "bcrypt";
import { generateToken } from "../Utilits/jwttoken.js";

const isProduction=process.env.NODE_ENV ==='production'
const cookieOptions={
httpOnly:true,
secure:isProduction,
sameSite:isProduction?'none':'lax',
priority:'high',
path:'/'
}
const Signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new AppError("all Fields must be required", 400, false));
  }
  const emailExist = await userModel.findOne({ email });
  if (emailExist) {
    return next(new AppError("user already exist please Login!", 400, false));
  }
  const passwordtype = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordtype.test(password)) {
    return next(
      new AppError("must be a letter and a number at least 6 characters")
    );
  }
  const generateSalt = await bcrypt.genSalt(3);
  const hashedPassword = await bcrypt.hash(password, generateSalt);
  const user =  new userModel({
    name,
    email,
    password: hashedPassword,
  });
  const token = generateToken(user._id);
  res.cookie("token",token,{
    ...cookieOptions,
    maxAge:24 * 60 * 60 * 1000,
  })
  await user.save()
  return res
    .status(201)
    .json({ message: "Sucessfully registered", succes: true });
};

const Login = async (req, res, next) => {};

export { Signup, Login };
