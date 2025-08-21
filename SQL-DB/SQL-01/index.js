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

  const q = "INSERT INTO user(id,username, email, password) VALUES ?";
  // insearting one value (?,?,?,?);
  //   const values = ["001", "001_hibkl", "haahoo@gmail.com", "123456n"];

  // inserting multiple values
  // const users = [
  //   ["002", "001_hibklb", "haahoob@gmail.com", "123456nb"],
  //   ["003", "001_hibklc", "haahooc@gmail.com", "123456nc"],
  //   ["004", "001_hibkld", "haahood@gmail.com", "123456nd"],
  // ];

  // inserting bulk data at once;

  const data = [];
  for (let i = 1; i <= 100; i++) {
    data.push(getRandomUser());
  }
 console.log(data);

  try {
    const [result] = await connection.query(q, [data]);
    

    console.log(result);
  } catch (error) {
    console.log(error, "eroor on the sql query");
  }

  connection.end();
})();

const getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
};
