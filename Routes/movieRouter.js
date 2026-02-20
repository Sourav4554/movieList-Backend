import express from "express";
import { addMovie ,listMovie,deleteMovie} from "../Controller/movieController.js";

const movieRouter=express.Router();

movieRouter.post('/addmovie',addMovie)
movieRouter.get('/list',listMovie)
movieRouter.delete('/delete/:id',deleteMovie)
export default movieRouter