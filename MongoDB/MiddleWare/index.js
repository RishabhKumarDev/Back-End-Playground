const express = require("express");
const app = express();

// middleware
// app.use((req, res, next) => {
//   console.log("hii, i am 1st middleware global");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("hii, i am 2nd middleware global");
//   next();
// });

// utility middleware
//loger
// app.use((req,res,next)=>{
//     req.time = new Date(Date.now()).toString();
//     console.log(req.method, req.hostname, req.path, req.time);
//     next();
// })

// path based use( middleware);
// app.use('/random',(req,res,next)=>{
//     console.log("i am only for Random");
//     next();
// })

//Access token check middleware
app.use("/api",(req,res,next)=>{
    let {token} = req.query;
    if( token === "giveaccess"){
        next();
    }
    res.send("ACCESS DENIED -- UNAUTHANTICATED USER SPOTTED");
})
app.get("/api",(req,res)=>{
    res.send("data");
})

// routes
app.get("/", (req, res) => {
  res.send("HII, I am Root");
});

app.get("/random", (req, res) => {
  res.send("I am just random");
});


// page not found middleware;
app.use((req,res)=>{
    res.send("Page Not Found");
})
app.listen("8080", () => {
  console.log("app is listining to port 8080");
});
