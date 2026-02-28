//class for custom error messages

class AppError extends Error {
  constructor(message, statusCode,success=false) {
    super(message);
    this.statusCode = statusCode;
    this.success=success 
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOpertational = true;
   // Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError
