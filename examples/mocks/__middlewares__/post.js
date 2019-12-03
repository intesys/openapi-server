const express = require("express");
const router = express.Router();

router.get("/post-middleware-route", (req, res) => {
  console.log("called post-middleware on route /post-middleware-route and sending response");
  res.send("response of /post-middleware-route");
});

module.exports = router;
