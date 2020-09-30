const _ = require("lodash");

const response = {
  id: 0,
  name: "string",
  description: "string",
  date: "2019-01-10T15:55:35.274Z",
};

module.exports = (req, res, next) => {
  _.set(res, "locals.body", response);
  next();
};
