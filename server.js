// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;

const sassMiddleware = require("./lib/sass-middleware");
const cookieParser = require('cookie-parser')
const express = require("express");
const app = express();
const morgan = require("morgan");


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect(error => {
  if (error) throw error;
  console.log("Server also connected");
});

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(cookieParser());

app.set('view engine', "ejs");
app.set('views');
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const indexRoutes = require("./routes/index");
const listingsRoute = require("./routes/my-listings");
const watchingRoute = require("./routes/watching");
const usersRoutes = require("./routes/users");
const messagesRoutes = require("./routes/messages");
const messageShowRoutes = require("./routes/message-show");
const loginRoutes = require("./routes/login");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/", indexRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/listings", listingsRoute(db));
app.use("/my-listings", listingsRoute(db));
app.use("/watching", watchingRoute(db));
app.use("/users", usersRoutes(db));
app.use("/messages", messagesRoutes(db));
app.use("/messages", messageShowRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
