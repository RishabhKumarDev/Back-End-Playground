const { faker } = require("@faker-js/faker");
const mysql = require("mysql2/promise");
const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

(async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "delta_app",
    password: "3EvdK%yR05$",
  });

  app.get("/", async (req, res) => {
    try {
      const q = "SELECT count(*) FROM user";
      const [result] = await connection.query(q);
      const count = result[0]["count(*)"];

      res.render("home.ejs");
    } catch (error) {
      console.log("some error", error);
      res.send("got some error in the db", error);
    }
  });

  // connection.end();
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
