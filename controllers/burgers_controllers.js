var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

// Displaying all info into the correct fields with two arrays (eaten, not eaten) sent to the index.html handlebar
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var burgersObject = {
      burgers: data
    };
    let notEaten = [];
    notEaten.noteatenburgers = [];
    let eaten = [];
    eaten.eatenburgers = [];
    for (let i=0; i<burgersObject.burgers.length; i++) {
      if (burgersObject.burgers[i].isEaten === 1) {
        eaten.eatenburgers.push(burgersObject.burgers[i])
      }
      else if (burgersObject.burgers[i].isEaten === 0) {
        notEaten.noteatenburgers.push(burgersObject.burgers[i])
      }
    }
    res.render("index", {data: {eaten, notEaten}});
  });
});

router.post("/api/burgers", function(req, res) {
  burger.insertOne([
    "burger, isEaten"
  ], [
    req.body.name, req.body.isEaten
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.updateOne({
    isEaten: req.body.isEaten
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;