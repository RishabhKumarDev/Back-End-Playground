const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));



app.get("/", (req, res) => {
  res.render("home");
});

app.get("/hi", (req, res) => {
  res.send("HI");
});
app.listen(port, (req, res) => {
  console.log(`app is working on ${port}`);
});
