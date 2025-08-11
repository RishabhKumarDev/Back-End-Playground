const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// serving static files
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/rolldice", (req, res) => {
  let diceVal = Math.floor(Math.random() * 6) + 1;
  res.render("rolldice", { diceVal });
});

app.get("/ig/:username", (req, res) => {
  // let followers = ["abc", "kanab", "sumit", "anna" , "panna", "sanna"];
  let { username } = req.params;

  const instaData = require("./data.json");
  const data = instaData[username];

  if (data) {
    res.render("instagram", { ...data });
  } else {
    res.render("error");
  }
});

app.get("/hi", (req, res) => {
  res.send("HI");
});
app.listen(port, (req, res) => {
  console.log(`app is working on ${port}`);
});
