import mongoose from "mongoose";

const Schema = mongoose.Schema;
const movieSchema = new Schema(
  {
    tittle: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum:{
        values:['action','comedy','drama','horror','sci-fi'],
        message:'This category is not allowed'
      },
      lowercase:true,
      trim:true,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const movieModel = mongoose.model.movie || mongoose.model("movie", movieSchema);

export default movieModel;
