const Express = require("express");
const cors = require("cors");
const app = Express();
const PostRouter = require("./routes/post.route");
const commentRoutes = require("./routes/comments.route");

app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/post", PostRouter);
app.use("/", PostRouter);
app.use("/comments", commentRoutes);

module.exports = app;
