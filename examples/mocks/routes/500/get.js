module.exports = (req, res, next) => {
  const error = new Error("error message");
  next(error);
};
