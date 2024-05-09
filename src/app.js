const Express = require("express");
const cors = require("cors");
const app = Express();
const PostRouter = require("./routes/post.route");
const commentRoutes = require("./routes/comments.route");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");

app.use(cors());

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/posts", PostRouter);
app.use("/comments", commentRoutes);
app.use("/user", userRouter);
app.use("/auth", authRouter);

module.exports = app;
