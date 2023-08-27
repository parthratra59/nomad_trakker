const mongoose = require("mongoose");
// require vali chij hmesha upr hi likho
require("dotenv").config();

exports.dBconnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log("db connection issue");
      console.log(err);
      process.exit(1);
    });
};
