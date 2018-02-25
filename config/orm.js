// Import MySQL connection.
var connection = require("../config/connection.js");

// Object for all our SQL statement functions.
var orm = {
    selectAll: function() {
      var queryString = "SELECT * FROM burgers";
      connection.query(queryString, function(err, result) {
        if (err) throw err;
        console.log(result);
      });
    },
    insertOne: function(burger_name, devoured) {
        var queryString = "INSERT INTO burgers (burger_name, devoured) VALUES (?, ?)";
        connection.query(queryString, [burger_name, devoured], function(err, result) {
          if (err) throw err;
          console.log(result);
        });        
    },
    updateOne: function(id, burger_name, devoured) {
        var queryString = "UPDATE burgers (burger_name, devoured) VALUES (?, ?) WHERE id = ?";
        connection.query(queryString, [burger_name, devoured, id], function(err, result) {
          if (err) throw err;
          console.log(result);
        });  
    }
};

// Export the orm object for the model (cat.js).
module.exports = orm;
