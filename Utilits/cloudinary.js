import { cloudinary } from "../configuration/cloudinary.js";
//set up cloudinary for upload image
const transformation = [
  { width: 800, crop: "scale" },
  { quality: "auto" },
  { fetch_format: "auto" },
];
const setupCloudinary = async (imageFile) => {
  return await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "movieHub",
          public_id: `image-${Date.now()}`,
          resource_type: "image",
          transformation: transformation,
        },
        (err, data) => {
          if (err) {
            reject(new AppError("cloudinary upload failed", 400, false));
          } else {
            resolve(data);
          }
        }
      )
      .end(imageFile.buffer);
  });
};

const updateCloudinary = async (public_id, imageFile) => {
  return await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: public_id,
          overwrite: true,
          invalidate: true,
          transformation: transformation,
        },
        (err, data) => {
          if (err) {
            reject(new AppError("cloudinary upload failed", 400, false));
          } else {
            resolve(data);
          }
        }
      )
      .end(imageFile.buffer);
  });
};

export { setupCloudinary, updateCloudinary };
