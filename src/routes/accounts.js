const { accounts } = require("../data");
const express = require("express");
const router = express.Router();

// Savings.
router.get("/savings", (req, res, next) => {
  res.render("account", {
    account: accounts.savings,
  });
});
// Checking.
router.get("/checking", (req, res, next) => {
  res.render("account", {
    account: accounts.checking,
  });
});
// Credit.
router.get("/credit", (req, res, next) => {
  res.render("account", {
    account: accounts.credit,
  });
});

module.exports = router;
