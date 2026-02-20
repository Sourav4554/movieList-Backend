import movieModel from "../Models/movieSchema.js";

//controller for add movie
const addMovie = async (req, res) => {
  const { tittle, category, rating } = req.body;
  try {
    if (!tittle || !category || !rating) {
      return res
        .status(400)
        .json({ message: "All fields required", success: false });
    }
    const movie = await movieModel.create({
      tittle,
      category,
      rating,
    });

    return res
      .status(201)
      .json({ message: "Movie added", data: movie, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
    console.log(error.message);
  }
};

//controller for retrive movie
const listMovie = async (req, res) => {
  try {
    const movieList = await movieModel.find(
      { isDeleted: false },
      { isDeleted: 0, createdAt: 0, updatedAt: 0 }
    );
    if (!movieList) {
      return res.status(404).json({ message: "Not Found", success: false });
    } else {
      return res.status(200).json({ data: movieList, success: true });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

//controller for Delete Movie
const deleteMovie = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "id didnt get", success: false });
  }
  try {
    const isDelete = await movieModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    );
    if (!isDelete) {
      return res
        .status(404)
        .json({ message: "movie Didnt delete", success: false });
    }
    return res
      .status(200)
      .json({ message: "Movie Sucesfully Deleted", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
//controller for update movie
const updateMovie = async (req, res) => {
  try {
    const isUpdate = await movieModel.findByIdAndUpdate(req.params, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!isUpdate) {
      return res.status(400).json({ message: "Doesnt update", success: false });
    }
    return res
      .status(200)
      .json({ message: "Sucesfully Updated", data: isUpdate, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
export { addMovie, listMovie, deleteMovie, updateMovie };
