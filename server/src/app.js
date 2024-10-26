import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
// app.use(express.static("dist"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import flowerRouter from "./routes/flower.routes.js";
import prayerRouter from "./routes/prayer.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/flowers", flowerRouter);
app.use("/api/v1/prayers", prayerRouter);
// http://localhost:300/api/v1/users/register
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

export { app };
