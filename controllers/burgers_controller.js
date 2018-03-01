var express = require("express");
var router = express.Router();

// Import the model to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
// burger.selectAll
router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    var hbsObject = {
      burgers: data
    };

    console.log("router get");
    console.log(hbsObject);

    //update html (handlebars)
    res.render("index", hbsObject);
  });
});

// burger.insertOne
router.post("/api/burgers", function (req, res) {

  console.log("router post");
  console.log(req);

  burger.insertOne(["burger_name"], [req.body.burger_name], function (result) {
    res.redirect('/'); // default get pulls new data
  });
});

// burger.updateOne
router.put("/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("router put");
  console.log(condition);
  console.log(req);

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function (result) {
    res.redirect('/'); // default get pulls new data
  });
});

// Export routes for server.js to use.
module.exports = router;