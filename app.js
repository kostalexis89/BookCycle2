// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

//************************************************* */
//I am gonna use this for everythin I want to protect!
//************************************************* */
const {isAuthenticated} = require('./middleware/jwt')
//************************************************* */
//************************************************* */
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, "/client/build")));

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js

const books = require("./routes/books")
app.use("/books", books)

const auth = require("./routes/auth");
app.use("/auth", auth);

const messages = require("./routes/messages");
app.use("/messages", messages);
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
app.use((req, res) => {
    // If no routes match, send them the React HTML.
    res.sendFile(__dirname + "/client/build/index.html");
  });

require("./error-handling")(app);

module.exports = app;
