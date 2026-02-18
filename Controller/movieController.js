import movieModel from "../Models/movieSchema.js";

//controller for add movie
const addMovie = async (req,res) => {
  const { tittle, category, rating } = req.body;
  try {
    if (!tittle || !category || !rating) {
      return res
        .status(400)
        .json({ message: "All fields required", success: false });
    }
   const movie= await movieModel.create({
      tittle,
      category,
      rating,
    });

  
    return res.status(201).json({ message: "Movie added",data:movie, success: true });
  } catch (error) {
    res.status(500).json({message:error.message,success:false})
    console.log(error.message);
  }
};

//controller for retrive movie
const listMovie=async(req,res)=>{

}
export { addMovie ,listMovie};
