const mongoose = require("mongoose");

const databaseURI = process.env.MONGODB_CONNECT_URI;

function connectToMongoose() {
  mongoose
    .connect(databaseURI)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch(() => {
      console.log("Error connecting to DB", databaseURI, error);
    });
}

module.exports = {
  connectToMongoose,
};
