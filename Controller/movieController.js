import movieModel from "../Models/movieSchema.js";
import AppError from "../Utilits/AppError.js";
import { errorHandler } from "../Utilits/errorHandler.js";
//controller for add movie
const addMovie = async (req, res, next) => {
  const { tittle, category, rating } = req.body;

  if (!tittle || !category || !rating) {
    return next(new AppError("All fields required", 400, false));
  }
  const movie = await movieModel.create({
    tittle,
    category,
    rating,
  });

  return res
    .status(201)
    .json({ message: "Movie added", data: movie, success: true });
};

//controller for retrive movie
const listMovie = async (req, res, next) => {
  const movieList = await movieModel.find(
    { isDeleted: false },
    { isDeleted: 0, createdAt: 0, updatedAt: 0 }
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
  const isDelete = await movieModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
  if (!isDelete) {
   return next(new AppError("cant delete movie", 404, false));
  }
  return res
    .status(200)
    .json({ message: "Movie Sucesfully Deleted", success: true });
};
//controller for update movie
const updateMovie = async (req, res, next) => {
  const { id } = req.params.id;
  if (!id) {
    return next(new AppError("id must be required"));
  }

  const isUpdate = await movieModel.findByIdAndUpdate(id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!isUpdate) {
    return next(new AppError("Cant update", 400, false));
  }
  return res
    .status(200)
    .json({ message: "Sucesfully Updated", data: isUpdate, success: true });
};
export { addMovie, listMovie, deleteMovie, updateMovie };
