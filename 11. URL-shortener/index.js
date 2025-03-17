const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connection");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");

const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

//db connection
connectToMongoDB("mongodb://127.0.0.1:27017/URL-shortner")
  .then(() => console.log("mongoDB Connected "))
  .catch((err) => console.log("error", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.listen(PORT, () => console.log(`server started on PORT: ${PORT}`));
