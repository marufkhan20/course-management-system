const Profile = require("../models/Profile");
const User = require("../models/User");

// get top student controller
const getTopStudentController = async (req, res) => {
  try {
    const students = await Profile.find().sort({
      assignmentNumber: -1,
    });

    res.status(200).json(students);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

module.exports = {
  getTopStudentController,
};
