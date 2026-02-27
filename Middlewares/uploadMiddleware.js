import multer from "multer";
import AppError from "../Utilits/AppError.js";
const multerStorage = multer.memoryStorage();

const filterFile = (req, file, cb) => {
if(file.mimetype.startsWith('image')){
cb(null,true)
}
else{
cb(new AppError('Only image files are accepted',400,false),false)
}
};

const uploadImage = multer({
  storage: multerStorage,
  limits: {
    fileSize: 2 * 1024 * 1024,
    files: 1,
  },
  fileFilter: filterFile,
});
 export {uploadImage}