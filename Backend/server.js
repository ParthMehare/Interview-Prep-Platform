require("dotenv").config();
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const connectToDB = require("./src/config/database");
const app = require("./src/app");

connectToDB();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
