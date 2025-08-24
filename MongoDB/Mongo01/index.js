const mongoose = require("mongoose");

(async () => {
  try {
    const connection = mongoose.connect("mongodb://127.0.0.1:27017/test");
    if (connection) {
      console.log("connection Succesful", connection);
    }
  } catch (error) {
    console.log(error);
  }
})();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});
