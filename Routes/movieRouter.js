import express from "express";
import { uploadImage } from "../Middlewares/uploadMiddleware.js";
import {
  addMovie,
  listMovie,
  deleteMovie,
  updateMovie,
} from "../Controller/movieController.js";

const movieRouter = express.Router();

movieRouter.post("/addmovie",uploadImage.single('image'),addMovie);
movieRouter.get("/list", listMovie);
movieRouter.delete("/delete/:id", deleteMovie);
movieRouter.patch("/update/:id", updateMovie);
export default movieRouter;
