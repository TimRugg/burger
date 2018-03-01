// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

// cretae burger model using functions in config
var burger = {
  // get - read
  selectAll: function (cb) {
    orm.selectAll("burgers", function (res) {
      cb(res);
    });
  },
  // create
  insertOne: function (cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, function (res) {
      cb(res);
    });
  },
  // update
  updateOne: function (objColVals, condition, cb) {
    orm.updateOne("burgers", objColVals, condition, function (res) {
      cb(res);
    });
  }
};

// Export to the controller
module.exports = burger;