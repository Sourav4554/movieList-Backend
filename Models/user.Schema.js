import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: function () {
      return this.provider !== "google";
    },
  },
  provider: {
    type: String,
    emum: ["local", "google"],
    default: "local",
  },
  googleId: {
    type: String,
  },
  avatar: {
    type: String,
  },
});
const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export { userModel };
