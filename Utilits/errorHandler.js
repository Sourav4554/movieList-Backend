//middleware for handling errors
const errorHandler = (err, req, res, next) => {
  //handling error from id
  if (err.name === "CastError") {
    const message = "provided Invalid id ";
    return res.status(400).json({
      status: "fail",
      message,
    });
  }
  //handling error from shema
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join("");
    console.log(message);

    return res.status(400).json({
      status: "fail",
      message,
    });
  }
  err.statusCode = err.statusCode || 500;
  err.success = err.success || false;
  err.status = err.status || "error";

  console.log("ERROR", err);

  //send response to client
  res.status(err.statusCode).json({
    status: err.status,
    success: err.success,
    message: err.message,
  });
};
export { errorHandler };
