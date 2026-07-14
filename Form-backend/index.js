const express = require("express");
const cors = require("cors");
const app = express();
const router = require('./routes/students.routes.js')
const connectDB = require("./db");
const port = 3000;

app.use(cors())
app.use(express.json());

connectDB();

app.use("/students",router) // post
app.use("/students",router) // get one data
app.use("/students",router) // get every data

app.get("/", (req, res) => {
  res.send("Server is Live");
});



app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
