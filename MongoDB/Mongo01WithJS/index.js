const mongoose = require("mongoose");

(async () => {
  try {
    const connection = await mongoose.connect("mongodb://127.0.0.1:27017/test");
    if (connection) {
      console.log("connection Succesful");
    }
  } catch (error) {
    console.log(error);
  }
})();

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    age: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

const user2 = new User({
  name: "mahima",
  email: "mahima@gmail.com",
  age: 13,
});

// user2.save();

// const user3 = User.insertMany([
//   { name: "tony", email: "tony@gmail.com", age: 12 },
//   { name: "bny", email: "bny@gmail.com", age: 12 },
//   { name: "stark", email: "stark@gmail.com", age: 12 },
//   { name: "hawk", email: "hawk@gmail.com", age: 12 },
//   { name: "null", email: "null@gmail.com", age: 12 },
// ])
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// find..
// User.find({ age: { $gt: 12 } })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// UPdate

//  User.updateOne({ name: "mahima" }, { $set: { age: 16 } }).then(res =>{console.log(res)});

// update Many

// User.updateMany(
//   { age: { $lt: 18 } },
//   {
//     $set: { age: 19, driver: true },
//   }
// ).then((res) => console.log(res));

// User.find({}).then(res => {console.log(res)});

// find one and update;

// User.findOneAndUpdate({ name: "ananaya" }, { name: "shristi" },{new: true}).then((res) =>
//   console.log(res)
// );
// User.findByIdAndUpdate("68ac164500c0625561a4dbcf",{name:"mahima"}, {new:true}).then(res=> console.log(res));

// delete
// 1. delete one

// User.deleteOne({name:"ananaya"}).then(res=>console.log(res));

// 2. delete many 
 
// User.deleteMany({age:{$gt:18}}).then(res=> console.log(res));

// 3. delete by id

// User.findByIdAndDelete('68adbd35b386453eec0a6c3a').then(res => console.log(res));

// 4. find one and delete

// User.findOneAndDelete({name:"hawk"}).then(res=> console.log(res));
