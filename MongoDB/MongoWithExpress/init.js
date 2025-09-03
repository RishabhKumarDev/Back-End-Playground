const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
    console.log("succesful connection ---- mongoose/mongoDB");
  } catch (error) {
    console.log(error);
  }
})();

const allChats = [
  {
    from: "Aarav",
    to: "Priya",
    msg: "Hey Priya, how was your day at work?",
  },
  {
    from: "Neha",
    to: "Rohit",
    msg: "Don’t forget we have dinner plans tonight.",
  },
  {
    from: "Karan",
    to: "Simran",
    msg: "I finally booked the tickets for Goa trip!",
  },
  {
    from: "Vikram",
    to: "Anjali",
    msg: "Can you send me the project files by evening?",
  },
  {
    from: "Sneha",
    to: "Arjun",
    msg: "I just watched that new movie, it was amazing!",
  },
  {
    from: "Rahul",
    to: "Ishita",
    msg: "Meeting got postponed, let’s catch up for coffee.",
  },
  {
    from: "Meera",
    to: "Dev",
    msg: "Happy Birthday, Dev! Hope you had a great day.",
  },
  {
    from: "Aditya",
    to: "Kavya",
    msg: "Did you complete the assignment submission?",
  },
  {
    from: "Sanya",
    to: "Manish",
    msg: "Thanks for helping me yesterday,.",
  },
  {
    from: "Ritika",
    to: "Siddharth",
    msg: "Let’s plan a weekend trip with the whole gang soon.",
  },
  {
    from: "Varun",
    to: "Pooja",
    msg: "I’ll call you once I’m done with the meeting.",
  },
  {
    from: "Aditi",
    to: "Nikhil",
    msg: "Can you share the notes from today’s lecture?",
  },
];


(async () => {
  const chats = await Chat.insertMany(allChats);
  console.log(chats);
})();
