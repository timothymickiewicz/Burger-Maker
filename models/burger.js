var orm = require("../config/orm.js");

var burgers = {
  selectAll: function(cb) {
    orm.selectAll("burgers", function(res) {
      cb(res);
    });
  },
  insertOne: function(cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(cols, vals, cb) {
    orm.updateOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
};

// Export burgers to burgers_controllers.js.
module.exports = burgers;