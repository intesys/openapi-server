const express = require("express");

const app = express();

app.get("/api/v2/pets", (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  //res.status(500).send("Server error");
  res.send("Pets response");
});

app.get("/api/200", (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  res.send("ok");
});

app.get("/api/200/json", (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  res.type("json");
  res.send({ response: "ok" });
});

app.get("/api/500", (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  res.status(500).send("Server error");
});

app.get("/api/500/json", (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  res.type("json");
  res.status(500).send({ error: "Server error" });
});

app.listen(3001);
