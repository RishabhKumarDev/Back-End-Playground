const mongoose = require("mongoose");

(async () => {
  try {
    const connection = await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
    if (connection) {
      console.log("connection Succesful");
    }
  } catch (error) {
    console.log(error);
  }
})();

const BookSchema = new mongoose.Schema({},{timestamps:true})