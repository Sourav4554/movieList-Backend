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
//controller for signup
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

//controller for userlogin
const Login = async (req, res, next) => {
const {email,password}=req.body
if(!email || !password){
return next(new AppError('fill required fields',400,false))
}
const isLogin=await userModel.findOne({email});
if(isLogin.googleId){
  return next(new AppError('This account was created using Google. Please login with Google.',400,false))
}
if(!isLogin){
return next(new AppError('user not found please register',404,false))
}
const checkCredentials=await bcrypt.compare(password,isLogin.password)
if(!checkCredentials){
return next(new AppError('Invalid email or password',401,false))
}
const token=generateToken(isLogin._id)
res.cookie('token',token,{
...cookieOptions,
maxAge:24 * 60 * 60 * 1000,
})
return res.status(200).json({message:'Login succesfull',success:true})
};

//controller for google authentication
const googleAuth=async(req,res)=>{
console.log(req.user)
return res.status(200).json({message:'success',success:true})
}


export { Signup, Login,googleAuth};
