import { userModel } from "../Models/user.Schema.js";

const googleAuthentication = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    console.log(profile)
    let user = await userModel.findOne({ googleId: profile.id });
    if (user) {
      return done(null, user);
    }
    user = await userModel.findOne({ email: profile.emails[0].value });
    if (user) {
      (user.googleId = profile.id), (user.provider = "google");
      await user.save();
      return done(null, user);
    }
    const newUser = userModel.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id,
      provider: "google",
    });
    return done(null, newUser);
  } catch (error) {
     return done(error,null)
   }
};

export { googleAuthentication };
