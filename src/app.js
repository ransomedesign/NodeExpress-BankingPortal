const fs = require("fs");
const path = require("path");
const express = require("express");
const { ap } = require("ramda");
const app = express();

// Set the location of the views dir.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Read the account data.
const accountData = fs.readFileSync("src/json/accounts.json", {
  encoding: "UTF8",
});
const accounts = JSON.parse(accountData);
// Read the user data.
const userData = fs.readFileSync("src/json/users.json", { encoding: "UTF8" });
const users = JSON.parse(userData);

// **** Routes ****
// Index.
app.get("/", (req, res, next) => {
  res.render("index", {
    title: "Account Summary",
    accounts: accounts,
  });
});
// Savings.
app.get("/savings", (req, res, next) => {
  res.render("account", {
    account: accounts.savings,
  });
});
// Checking.
app.get("/checking", (req, res, next) => {
  res.render("account", {
    account: accounts.checking,
  });
});
// Credit.
app.get("/credit", (req, res, next) => {
  res.render("account", {
    account: accounts.credit,
  });
});
// Profile route
app.get("/profile", (req, res, next) => {
  res.render("profile", {
    user: users[0],
  });
});

app.listen(3000, () => {
  console.log("PS Project Running on port 3000!");
});
