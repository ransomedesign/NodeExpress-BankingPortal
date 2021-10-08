const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const { router: servicesRoutes } = require("./routes/services");
const { router: accountRoutes } = require("./routes/accounts");

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

app.listen(3000, () => {
  console.log("PS Project Running on port 3000!");
});
