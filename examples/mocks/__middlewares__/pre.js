const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("called pre-middleware");
  next();
});

router.get("/pre-middleware-route", (req, res) => {
  console.log(
    "called pre-middleware on route /pre-middleware-route and sending response"
  );
  res.send("response of /pre-middleware-route");
});

router.use((req, res, next) => {
  next();
  console.log("called post-middleware");
});

module.exports = router;
