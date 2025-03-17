const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");


const app = express();
const PORT = 8000;

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
app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});
//REST API
//route to get all users data as json format
app.get("/api/users", (req, res) => {
  res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if(!user) return res.status(404).json({error: "user not found"});
    res.json(user);
  })
  .patch((req, res) => {
    //edit user with id
    res.send({ status: "pending" });
  })
  .delete((req, res) => {
    //delete user with id
    res.send({ status: "pending" });
  });

//create user
app.post("/api/users", (req, res) => {
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
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    res.status(201).json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
