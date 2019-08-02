module.exports = (req, res, next) => {
  const error = new Error(JSON.stringify({ message: "error message" }));
  res.type("json");
  res.status(500);
  next(error);
};
