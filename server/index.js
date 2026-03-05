const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config();
const connectDB = require("./db");
connectDB(); 