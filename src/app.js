const fs = require("fs");
const path = require("path");
const express = require("express");
const { ap } = require("ramda");
const app = express();

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
// Transfer
app.get("/transfer", (req, res, next) => {
  res.render("transfer");
});
app.post("/transfer", (req, res, next) => {
  // Calculate from figures.
  const { from, to, amount } = req.body;
  accounts[from].balance = parseInt(accounts[from].balance) - parseInt(amount);
  accounts[to].balance = parseInt(accounts[to].balance) + parseInt(amount);

  // Write the data to the accounts file.
  writeJSON();

  res.render("transfer", { message: "Transfer Completed" });
});
// Payment route.
app.get("/payment", (req, res, next) => {
  res.render("payment", { account: accounts.credit });
});
app.post("/payment", (req, res, next) => {
  const { amount } = req.body;
  accounts.credit.balance =
    parseInt(accounts.credit.balance) - parseInt(amount);
  accounts.credit.available =
    parseInt(accounts.credit.available) + parseInt(amount);

  // Write the data to the accounts file.
  writeJSON();

  res.render("payment", {
    message: "Payment Successful",
    account: accounts.credit,
  });
});

app.listen(3000, () => {
  console.log("PS Project Running on port 3000!");
});
