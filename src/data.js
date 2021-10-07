const fs = require("fs");
const path = require("path");

// Read the account data.
const accountData = fs.readFileSync("src/json/accounts.json", {
  encoding: "UTF8",
});
const accounts = JSON.parse(accountData);
// Read the user data.
const userData = fs.readFileSync("src/json/users.json", { encoding: "UTF8" });
const users = JSON.parse(userData);

const writeJSON = () => {
  // Write the data to the accounts file.
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(__dirname, "json/accounts.json"), accountsJSON, {
    encoding: "UTF8",
  });
};

module.exports = {
  accounts,
  users,
  writeJSON,
};
