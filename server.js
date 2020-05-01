var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

// Configures the dotenv file
require('dotenv').config()

var app = express();

// Set the port of the application
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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

app.get("/", function(req, res) {
  connection.query("SELECT * FROM burgers;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { burgers: data });
  });
});

// Create a new movie
app.post("/api/burgers", function(req, res) {
  connection.query("INSERT INTO burgers (burger) VALUES (?)", [req.body.burger], function(err, result) {
    if (err) {
      return res.status(500).end();
    }

    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});

// Retrieve all movies
app.get("/api/burgers", function(req, res) {
  connection.query("SELECT * FROM burgers;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.json(data);
  });
});

// The below code is for updating the id so it doesn't mess the other table up

/* <br/><br/> SELECT MAX(id) INTO @max_id FROM TABLE_1 WHERE ....<br/> INSERT INTO TABLE_2 SELECT * FROM TABLE_1 WHERE id<=@max_id AND ....<br/> DELETE FROM TABLE_1 WHERE id<=@max_id AND ....<br/> */

app.delete("/api/burgers/:id", function(req, res) {
  connection.query("DELETE FROM burgers WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
