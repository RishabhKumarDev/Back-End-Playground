const { faker } = require("@faker-js/faker");
const mysql = require("mysql2/promise");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

(async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "delta_app",
    password: "3EvdK%yR05$",
  });

  // home page
  app.get("/", async (req, res) => {
    try {
      const q = "SELECT count(*) FROM user";
      const [result] = await connection.query(q);
      const count = result[0]["count(*)"];

      res.render("home.ejs", { count });
    } catch (error) {
      console.log("some error", error);
      res.send("got some error in the db", error);
    }
  });

  // user page
  app.get("/user", async (req, res) => {
    try {
      const q = "SELECT id, username, email FROM user";
      const [users] = await connection.query(q);
      // console.log(users);
      res.render("user.ejs", { users });
    } catch (error) {
      console.log(error);
    }
  });

  //  edit
  app.get("/user/:id/edit", async (req, res) => {
    try {
      let { id } = req.params;
      const q = "select * from user where id = ?";
      const value = id;
      const [result] = await connection.query(q, value);
      const user = result[0];
      console.log(user);
      res.render("edit.ejs", { user });
    } catch (error) {
      res.render(error);
    }
  });

  app.patch("/user/:id", async (req, res) => {
    try {
      let { id } = req.params;
      const query = `SELECT * from user where id = '${id}'`;
      const [result] = await connection.query(query);
      const user = result[0];
      let { password, username } = req.body;
      console.log(user);

      if (password === user.password) {
        const q = `UPDATE user SET username = '${username}' WHERE id = '${id}'`;
        const [result] = await connection.query(q);
        res.send(`wooo correct updated your name.. ${username}`);
      } else {
        res.send("password wrong try again");
      }
    } catch (error) {
      res.send(error);
    }
  });

  // add info of new user;
  app.get("/user/new", (req, res) => {
    res.render("newPage.ejs");
  });
  app.post("/user", async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const q =
        "INSERT INTO user (id, username, email, password) VALUES (?,?,?,?)";
      const values = [faker.string.uuid(), username, email, password];
      const [result] = await connection.query(q, values);
      console.log(result, username, email, password);
      res.redirect("/user");
    } catch (error) {
      console.log(error);
    }
  });
  // delete user
  app.delete("/user/:id", async (req, res) => {
    try {
      let { id } = req.params;
      let q = `DELETE FROM user WHERE id ='${id}'`;
      let [result] = await connection.query(q);
      res.redirect("/");
    } catch (error) {
      res.send(error);
    }
  });
})();

const getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
};

app.listen("8080", () => {
  console.log("app is listening to port 8080");
});
