const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

// connecting to MongoDB.
(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
    console.log("succesful connection ---- mongoose/mongoDB");
  } catch (error) {
    console.log(error);
  }
})();

// insert Data
let chat1 = new Chat({
  from: "priya",
  to: "neha",
  msg: "bro, i like him...",
});

// save data and log result;
// (async () => {
//   const chat = await chat1.save();
//   console.log(chat);
// })();

// setting for express.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// express routes
app.get("/", (req, res) => {
  res.send("working here");
});

// Index Route -- to Show all chats;
app.get("/chats", async (req, res) => {
  const allChats = await Chat.find({});
  // console.log(allChats);
  res.render("index.ejs", { allChats });
});

// creating a new chat and saving in the DB.

// get request to render form--
app.get("/chats/new", (req, res) => {
  res.render("newChat.ejs");
});

// post req -- to save chat in DB
app.post("/chats", async (req, res) => {
  let { from, msg, to } = req.body;
  console.log(from, msg, to);
  let newChat = { from, msg, to };
  let chat = await new Chat(newChat).save();
  console.log(chat);
  res.redirect("/chats");
});

// update Messages
// get route for form--
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  // console.log(chat);
  res.render("edit.ejs", { chat });
});

// put request -- updte Db
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { newMsg } = req.body;

  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { $set: { msg: newMsg } },
    { runValidators: true, new: true }
  );
  console.log("updated chat", updatedChat);
  res.redirect("/chats");
});

// delete chat;
// delet req
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});

app.listen("8080", () => {
  console.log("app is listining --- express");
});
