// Configures the dotenv file
require('dotenv').config();
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: process.env.host,
  port: process.env.port,
  user: process.env.user,
  password: process.env.pw,
  database: process.env.db
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});
  
module.exports = connection;