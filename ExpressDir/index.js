const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`hello:: Express is working on the Port ${port}`);
});


app.get("/",(req,res)=>{
    console.log("in root ");
    
    res.send("response sent from root ")
})

app.get("/apple",(req,res)=>{
    console.log("in apple ");

    res.send("response sent from apple ")
})


app.get("/banana",(req,res)=>{
    console.log("in banana ");

    res.send("response sent from banana ")
})



// app.use((req, res) => {

//   console.log("request received");
//   const code = "<h1> kuch bhi</h1> <ul> jjjj<ul>"
//   res.send(code);
// });
