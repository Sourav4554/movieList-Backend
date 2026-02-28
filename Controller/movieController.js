import movieModel from "../Models/movieSchema.js";
import AppError from "../Utilits/AppError.js";
import { setupCloudinary } from "../Utilits/cloudinary.js";
import { updateCloudinary } from "../Utilits/cloudinary.js";
//controller for add movie
const addMovie = async (req, res, next) => {
  const { tittle, category, rating } = req.body;
  const imageFile = req.file;

  if (!tittle || !category || !rating || !imageFile) {
    return next(new AppError("All fields required", 400, false));
  }

  //cloudinary upload
  const result = await setupCloudinary(imageFile);
  const movie = await movieModel.create({
    tittle,
    category,
    rating,
    image: result.secure_url,
    public_id: result.public_id,
  });

  return res
    .status(201)
    .json({ message: "Movie added", data: movie, success: true });
};

//controller for retrive movie
const listMovie = async (req, res, next) => {
  const movieList = await movieModel.find(
    { isDeleted: false },
    { isDeleted: 0, createdAt: 0, updatedAt: 0, public_id: 0 }
  );
  if (!movieList.length) {
    return next(new AppError("No Movies", 404, false));
  } else {
    return res.status(200).json({ data: movieList, success: true });
  }
};

//controller for Delete Movie
const deleteMovie = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new AppError("id must be required", 400, false));
  }
  const movie = await movieModel.findById(id, { public_id: 1, isDeleted: 1 });
  if (!movie) {
    return next(new AppError("id is false", 400, false));
  }
   movie.isDeleted=true;
   const isDelete=await movie.save();
  if (!isDelete) {
    return next(new AppError("cant delete movie", 404, false));
  }
  return res
    .status(200)
    .json({ message: "Movie Sucesfully Deleted", success: true });
};

//controller for update movie
const updateMovie = async (req, res, next) => {
  const { id } = req.params;
  const imageFile = req.file;
  if (!id) {
    return next(new AppError("id must be required", 400, false));
  }
  const movie = await movieModel.findById(id);
  if (!movie) {
    return next(new AppError("id is false", 400, false));
  }
  if (imageFile) {
    const result = await updateCloudinary(movie.public_id, imageFile);
    movie.public_id = result.public_id;
    movie.secure_url = result.secure_url;
  }
  Object.assign(movie, req.body);
  const isUpdate = await movie.save();
  if (!isUpdate) {
    return next(new AppError("Cant update", 400, false));
  }
  return res
    .status(200)
    .json({ message: "Sucesfully Updated", data: isUpdate, success: true });
};
export { addMovie, listMovie, deleteMovie, updateMovie };
