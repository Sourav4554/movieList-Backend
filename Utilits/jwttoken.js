import jwt from 'jsonwebtoken'
import 'dotenv/config'

const secretKey=process.env.JWTKEY
export const generateToken=(id)=>{
 const token=jwt.sign(
  {userId:id},
  secretKey,
  {expiresIn:'1d'}
  )
  return token;
}