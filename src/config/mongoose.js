const mongoose = require("mongoose");

const databaseURI = process.env.MONGODB_CONNECT_URI;

function connectToMongoose() {
  mongoose
    .connect(databaseURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((error) => {
      console.log("Error connecting to DB", databaseURI, error);
    });
}

module.exports = {
  connectToMongoose,
};
