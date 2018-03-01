// Import MySQL connection
var connection = require("../config/connection.js");

// Helper function for SQL syntax - from MVC class 14.3
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}
// Helper function to convert object key/value pairs to SQL syntax - from MVC class 14.3
function objToSql(ob) {
  var arr = [];
  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }
  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  selectAll: function (tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";

    console.log("selectAll");
    console.log(queryString);

    // run the queryString
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      // return
      cb(result);
    });
  },

  insertOne: function (tableInput, cols, vals, cb) {
    var queryString = "INSERT INTO " + tableInput;
    // build the query string
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log("insertOne");
    console.log(queryString);

    // run the queryString
    connection.query(queryString, vals, function (err, result) {
      if (err) throw err;
      // return
      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  updateOne: function (tableInput, objColVals, condition, cb) {
    var queryString = "UPDATE " + tableInput;
    // build query
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log("updateOne");
    console.log(queryString);

    // run the queryString
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      // return
      cb(result);
    });
  }
};

// Export the orm object for the model
module.exports = orm;