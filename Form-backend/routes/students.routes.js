const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const { ObjectId } = require("mongodb");

// router.use(express.json());

router.post("/register", async (req, res) =>
{
  try {
    const { name, email, rollno } = req.body;

    if (!name || !email || !rollno) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const student = new Student({
      name,
      email,
      rollno,
    });

    console.log(student);

    await student.save();

    res.status(201).json({
      message: "Data saved successfully",
    });
  } catch (error) {
    console.error("Server Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getme/:id", async (req, res) =>
{
  try {
    const id = req.params.id;
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        message: "Does nor exist",
      });
    }
    res.status(200).json({
      message: "Student find",
      student: {
        name: student.name,
        email: student.email,
        rollno: student.rollno,
      },
    });
  } catch (error) {
    console.error("Server Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/data", async (req, res) =>
{
  try {
    const students = await Student.find();
    const studentData = students.map(student => ({
      name: student.name,
      email: student.email,
      rollno: student.rollno
    }))
    res.status(200).json(studentData);
  } catch (error) {
    console.error("Server Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
})

module.exports = router;
