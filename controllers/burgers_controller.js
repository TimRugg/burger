var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
// burger.selectAll
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
      var hbsObject = {
        burgers: data
      };

      console.log("router get");
      console.log(hbsObject);
      
      res.render("index", hbsObject);
    });
  });

// burger.insertOne
router.post("/", function(req, res) {

    console.log("router post");
    console.log(res);

    burger.insertOne(req.body.burger_name, req.body.devoured, function() {
      // refresh the html
      res.redirect("/");
    });
  });

// burger.updateOne
router.put("/:id", function(req, res) {
  
    console.log("router put");
    console.log(res);
  
    burger.updateOne(req.body.id, req.body.burger_name, req.body.devoured, function() {
        // refresh the html
        res.redirect("/");
    });
  });
  

// Export routes for server.js to use.
module.exports = router;