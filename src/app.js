const fs = require("fs");
const path = require("path");
const express = require("express");
const { ap } = require("ramda");
const app = express();

// Set the location of the views dir.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res, next) => {
  res.render("index", { title: "Index" });
});

app.listen(3000, () => {
  console.log("PS Project Running on port 3000!");
});
