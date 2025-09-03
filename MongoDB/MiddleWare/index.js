const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

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

//Access token check middleware / Throwing Our Custom Error;
const checkToken =
  ("/api",
  (req, res, next) => {
    let { token } = req.query;
    if (token === "giveaccess") {
      next();
    }
    throw new ExpressError(401,"ACCESS DENIED -- UNAUTHANTICATED USER SPOTTED");
  });

app.get("/api", checkToken, (req, res) => {
  res.send("data");
});

// routes
app.get("/", (req, res) => {
  res.send("HII, I am Root");
});

app.get("/random", (req, res) => {
  res.send("I am just random");
});

// creating error
app.get("/err", (req, res) => {
  abcd = abcd;
  
});
//Error Handler
app.use((err, req, res, next) => {
  console.log("---------Error----------");
  next(err);
});

// checking if we instead of calling next .send the err will default error work?? 
app.use((err, req, res, next) => {
  console.log("---------Error 2----------");
  const {status = 500, message} = err;
  res.status(status).send(message);
  // next(err);
});

// app.use((err, req, res, next) => {
//   console.log("---------Error 3----------");
//   next(err);
// });

// page not found middleware;
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen("8080", () => {
  console.log("app is listining to port 8080");
});
