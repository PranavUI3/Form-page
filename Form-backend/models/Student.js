const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rollno: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", userSchema);

module.exports = Student;
