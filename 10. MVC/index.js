const express = require("express");
const { connectMongoDb } = require("./connection");
const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares");

const app = express();
const PORT = 8000;
//connection
connectMongoDb("mongodb://127.0.0.1:27017/NodeJs-1");

//middleware
//buitin middleware
app.use(express.urlencoded({ extended: false }));
//creating custom middleware
app.use(logReqRes("log.txt"));

//routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
