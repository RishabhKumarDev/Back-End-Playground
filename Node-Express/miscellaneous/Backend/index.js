const express = require("express");
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/register", (req, res) => {
  let { user, password } = req.query;

  res.send(
    `Standard GET request; your username is: ${user} and password is : ${password}`
  );
});

app.post("/register", (req, res) => {
  
    let {user, password} = req.body;
  res.send(`Standard POST request; your name is :${user} and password is:${password}`);
});

app.listen(port, (req, res) => {
  console.log("app in listening_");
});
