const authenticate = (req, res, next) => {
  // Không cần kiểm tra Authorization header nữa
  console.log("No authentication required");

  // Tiếp tục với middleware mà không cần token
  next();
};

module.exports = authenticate;
