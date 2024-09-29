const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: false }));

// Use defined routes
app.use("/", routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
