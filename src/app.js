const Express = require("express");
const cors = require("cors");

const app = Express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

module.exports = app;
