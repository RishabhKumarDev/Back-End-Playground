const { faker } = require("@faker-js/faker");
const mysql = require("mysql2/promise");

// Create the connection to database
(async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "delta_app",
    password: "3EvdK%yR05$",
  });
  let name;
  const q = "INSERT INTO user(id,username, email, password) VALUES ?";
  // insearting one value (?,?,?,?);
  //   const values = ["001", "001_hibkl", "haahoo@gmail.com", "123456n"];

  // inserting multiple values
  const users = [
    ["002", "001_hibklb", "haahoob@gmail.com", "123456nb"],
    ["003", "001_hibklc", "haahooc@gmail.com", "123456nc"],
    ["004", "001_hibkld", "haahood@gmail.com", "123456nd"],
  ];

  try {
    const [result] = await connection.query(q, [users]);

    console.log(result);
  } catch (error) {
    console.log(error, "eroor on the sql query");
  }

  connection.end();
})();

const getRandomUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

// console.log(getRandomUser());
