var connection = require("./connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

var orm = {
  selectAll: function(table, cb) {
    var queryString = "SELECT * FROM " + table;
    connection.query(queryString, [table], function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  // insertOne: function(table, burgerName, isEaten) {
  //   var queryString = "INSERT INTO ?? (burger, isEaten) VALUES (?, ?)";
  //   // Burgers
  //   console.log(queryString);
  //   connection.query(queryString, [table, burgerName, isEaten], function(err, result) {
  //     if (err) throw err;
  //     cb(result);
  //     console.log(result);
  //   });
  // },
  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  updateOne: function(table, booleanValue, userInput) {
    var queryString =
      "UPDATE ?? SET isEaten = ? WHERE id = ?";
    // burgers, isEaten, 1, id, userInputID
    connection.query(
        queryString,
        [table, booleanValue, userInput],
        function(err, result) {
            if (err) throw err;
            console.log(result);
        }
    );
  }
};

module.exports = orm;