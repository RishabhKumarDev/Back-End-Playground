const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverRide = require("method-override");

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverRide("_method"));

let posts = [
  {
    id: "1",
    username: "mars",
    content: "hey, dude come live on me sd",
  },
  {
    id: "2",
    username: "pluto",
    content: "i am also a planet...",
  },
  {
    id: "3",
    username: "sun",
    content: "my color is white not yellow you fellow",
  },
];

app.get("/posts", (req, res) => {
  res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({
    id,
    username,
    content,
  });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  const post = posts.find((post) => post.id === id);
  res.render("show", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body?.content;
  const post = posts.find((post) => post.id === id);
  console.log(post, req.body);

  post.content = newContent;
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  const post = posts.find((post) => post.id === id);
  res.render("edit", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((post) => post.id !== id);
 res.redirect("/posts");});
app.listen(port, () => {
  console.log(`hee hee hee the port is ${port}`);
});
