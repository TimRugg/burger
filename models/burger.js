// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
    selectAll: function(cb) {
      orm.selectAll(function(res) {
        cb(res);
      });
    },
    insertOne: function(burger_name, devoured, cb) {
        orm.insertOne(burger_name, devoured, function(res) {
            cb(res);
        });
    },
    updateOne: function(id, burger_name, devoured, cb) {
        orm.updateOne(id, burger_name, devoued, function(res) {
            cb(res);
        });
    }
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;