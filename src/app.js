const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const servicesRoutes = require("./routes/services");
const accountRoutes = require("./routes/accounts");

// Set the location of the views dir.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const { accounts, users, writeJSON } = require("./data");

// **** Routes ****
// Index.
app.get("/", (req, res, next) => {
  res.render("index", {
    title: "Account Summary",
    accounts: accounts,
  });
});

// Profile route
app.get("/profile", (req, res, next) => {
  res.render("profile", {
    user: users[0],
  });
});

app.use("/services", servicesRoutes);
app.use("/account", accountRoutes);

app.listen(3000, () => {
  console.log("PS Project Running on port 3000!");
});
