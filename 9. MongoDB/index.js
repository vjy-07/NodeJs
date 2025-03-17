const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;
//connection
mongoose.connect("mongodb://127.0.0.1:27017/NodeJs-1")
.then(()=> console.log("mongoDB Connected"))
.catch((err)=> console.log("Mongo Error ",err));

//schema
const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,
  },
  lastName:{
    type: String,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  jobTitle:{
    type: String,
  },
  gender:{
    type: String,
  },
},{timestamps:true}
);
const User= mongoose.model('user',userSchema);
//middleware
//buitin middleware
app.use(express.urlencoded({ extended: false }));
//creating custom middleware
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}: ${req.method}: ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

//routes
//get all users data as html
app.get("/users", async (req, res) => {
  const allDbUsers=await User.find({});
  const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName}-${user.email}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});
//REST API
//route to get all users data as json format
app.get("/api/users", async (req, res) => {
  const allDbUsers=await User.find({});
  // res.setHeader("X-MyName","Vijay");  custom headers
  res.json(allDbUsers);
});

app
  .route("/api/users/:id")
  .get( async (req, res) => {
    const user= await User.findById(req.params.id);
    if(!user) return res.status(404).json({error: "user not found"});
    res.json(user);
  })
  .patch(async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, {});
    //edit user with id
    res.send({ status: "success" });
  })
  .delete(async(req, res) => {
    //delete user with id
    await User.findByIdAndDelete(req.params.id);
    res.send({ status: "success" });
  });

//create user
app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    res.status(400).json({ msg: "All fields are required" });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({msg:"success"});
});

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
