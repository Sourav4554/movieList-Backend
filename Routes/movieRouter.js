import express from "express";
import { addMovie ,listMovie} from "../Controller/movieController.js";

const movieRouter=express.Router();

movieRouter.post('/addmovie',addMovie)
movieRouter.get('/list',listMovie)
export default movieRouter