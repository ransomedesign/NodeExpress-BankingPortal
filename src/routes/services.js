const express = require("express");
const router = express.Router();
const { accounts, writeJSON } = require("../data");

// Payment route.
router.get("/payment", (req, res, next) => {
  res.render("payment", { account: accounts.credit });
});
router.post("/payment", (req, res, next) => {
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

module.exports = {
  router,
};
