var express = require("express");
var mongoose = require("mongoose");
var expressHandelbars = require("express-handlebars");
var bodyParser = require("body-parser");
var path = require("path");


// Set up port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Set up Express Router
var router = express.Router();

// Require routes 
require("./config/routes")(router);

// Make public a static folder
app.use(express.static("public"));

// Connect handelbars to the express app
app.engine("handlebars", expressHandelbars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Configure middleware
// Have every request go through our router middleware
app.use(router);

// If deployed, use the deployed database. Otherwise use the local MongHeadLines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";

// Connect mongoose to our datatbase
mongoose.connect("mongodb://localhost/mongoHeadLines", { useNewUrlParser: true });


// Listen on port
app.listen(PORT, function() {
    console.log("listening on port:" + PORT)
});