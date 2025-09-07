const mongoose = require("mongoose");
const { Schema } = require("mongoose");

(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationalDemo");
    console.log("succesful connection ---- mongoose/mongoDB");
  } catch (error) {
    console.log(error);
  }
})();

const userSchema = new Schema({
  name: String,
  email: String,
});

const postSchema = new Schema({
  content: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const addData = async () => {
  let user = await User.findOne({name:"bittu"});

  let post2 = new Post({
    content: "happy birthday to you",
    likes: 112,
  });

  post2.user = user;

  await post2.save();
};

const getData = async ()=>{
    let posts = await Post.find({}).populate("user");
    console.log(posts);
}
// addData();
getData();