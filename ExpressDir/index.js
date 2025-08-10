const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`hello:: Express is working on the Port ${port}`);
});

app.get("/", (req, res) => {
  console.log("in root ");

  res.send("HI i am  root ");
});

// Query String
app.get("/search", (req, res) => {
  console.log("received query", req.query);
  let {q} = req.query;

  res.send(`Query Result are: ${q} `);
});



// // dynamic path(params);
// app.get("/:username/:userId",(req,res)=>{

//     let {username, userId} = req.params;

//     res.send(`hi dude your username is ${username +" " + userId  }`)
// })

// app.get("/:username/:userId/:oneId",(req,res)=>{

//     let {username, userId, oneId} = req.params;

//     res.send(`hi dude your username is ${username +" " + userId + "  " + oneId }`)
// })

// response depending on Request
// app.get("/apple",(req,res)=>{
//     console.log("in apple ");

//     res.send("response sent from apple ")
// })

// app.get("/banana",(req,res)=>{
//     console.log("in banana ");

//     res.send("response sent from banana ")
// })

// app.use((req, res) => {

//   console.log("request received");
//   const code = "<h1> kuch bhi</h1> <ul> jjjj<ul>"
//   res.send(code);
// });
