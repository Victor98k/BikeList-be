const app = require("./app.js");

const { connectToMongoose } = require("./config/mongoose.js");

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectToMongoose();
});

// why is this file error on the deploy.
