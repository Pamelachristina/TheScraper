var express = require("express");
var mongoose = require("mongoose");
var expressHandelbars = require("express-handlebars");
var bodyParser = require("body-parser");


// Set up port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Set up Express Router
var router = express.Router();

// Make public a static folder
app.use(express.static("public"));

// Connect handelbars to the express app
app.engine("handlebars", expressHandelbars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use bodyParser in the app
app.use(bodyParser.urlencoded({
    extended: false
}));



// Configure middleware
// Have every request go through our router middleware
app.use(router);

// If deployed, use the deployed database. Otherwise use the local MongHeadLines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";

// Connect mongoose to our datatbase
mongoose.connect(db, function(error) {
    // log any errors connecting with mongoose
    if (error) {
        console.log(error);
    }
    // Or log a success message
    else {
        console.log("mongoose connection is successful");
    }
});


// Listen on port
app.listen(PORT, function() {
    console.log("listening on port:" + PORT)
});