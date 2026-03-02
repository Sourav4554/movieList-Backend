import express from "express";
import { uploadImage } from "../Middlewares/uploadMiddleware.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import {
  addMovie,
  listMovie,
  deleteMovie,
  updateMovie,
} from "../Controller/movieController.js";

const movieRouter = express.Router();

movieRouter.post(
  "/addmovie",
  authMiddleware,
  uploadImage.single("image"),
  addMovie
);
movieRouter.get("/list", authMiddleware, listMovie);
movieRouter.delete("/delete/:id", deleteMovie);
movieRouter.patch("/update/:id", uploadImage.single("image"), updateMovie);
export default movieRouter;
