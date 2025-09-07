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
  username: {
    type: String,
  },
  addresses: [
    {
      location: String,
      city: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const addUser = async () => {
  const user1 = new User({
    username: "super man",
    addresses: [
      {
        location: "farm house",
        city: "i can't remember",
      },
    ],
  });

  user1.addresses.push({
    location: "kanke",
    city: "ranchi",
  });

  let result = await user1.save();
  console.log(result);
};

addUser();