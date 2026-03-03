import 'dotenv/config'
import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import { googleAuthentication } from '../Services/auth.service.js';
const URL=`http://localhost:3000/api/user/google/callback`

passport.use(new GoogleStrategy({
clientID:process.env.GOOGLE_CLIENT_ID,
clientSecret:process.env.GOOGLE_CLIENT_SECRET,
callbackURL:URL
},
googleAuthentication
));
export default passport