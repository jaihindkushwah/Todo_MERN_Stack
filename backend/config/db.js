const mongoose = require("mongoose");

const connection_string = process.env.DB_URI;
mongoose
  .connect(connection_string)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));
module.exports = mongoose;
