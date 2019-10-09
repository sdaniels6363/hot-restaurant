// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// variables for reserved tables and waitlist
// =============================================================
var waitlist = [];
var tables = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function (req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// takes whatever is after /api/* and based on the value it performs a certain function
app.get("/api/:userInput", function (req, res) {
  var chosen = req.params.userInput;

  console.log(chosen);

  switch (chosen) {
    case "waitlist":
      // send back json version of the waitlist array
      return res.json(waitlist);
    case "tables":
      // send back json version of the tables array
      return res.json(tables);
    default:
      // reply on 0 case matches
      return res.send("Page not found.")
  }

});

// Create New Characters - takes in JSON input
app.post("/api/characters", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newCharacter = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

  newCharacter.age = parseInt(newCharacter.age);
  newCharacter.forcePoints = parseInt(newCharacter.forcePoints);

  console.log(newCharacter);

  characters.push(newCharacter);

  res.json(newCharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
