const Assignment = require("../models/Assignment");
const Course = require("../models/Course");
const SubmitAssignment = require("../models/SubmitAssignment");
const User = require("../models/User");
const Profile = require("../models/Profile");

// get all assignments controller
const getAllAssignmentsController = async (req, res) => {
  try {
    const allAssignments = await Assignment.find()
      .populate("course")
      .sort({ createdAt: -1 });

    res.status(200).json(allAssignments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// get single assignment controller
const getSingleAssignmentController = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { role, userid: userId } = req.user || {};

    let queryString;

    if (role === "student") {
      queryString = {
        $or: [{ student: "all-student" }, { student: userId }],
        $and: [{ _id: assignmentId }],
      };
    } else {
      queryString = { _id: assignmentId };
    }

    const assignment = await Assignment.find(queryString).populate(
      "submitAssignments"
    );

    if (assignment.length > 0) {
      res.status(200).json(assignment[0]);
    } else {
      res.status(200).json({ notFound: true });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// get assignments by student id controller
const getAssignmentsByStudentIdController = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.stauts(400).json({
        error: "Please Provide a Valid Student ID!!",
      });
    }

    const assignments = await Assignment.find({
      $or: [{ student: studentId }, { student: "all-student" }],
    }).populate(["course", "submitAssignments"]);

    res.status(200).json(assignments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// create new assignment controller
const createAssignmentController = async (req, res) => {
  try {
    const { name, course, number, deadline, student, hints, brief } = req.body;

    // create new assignment
    const assignment = new Assignment({
      name,
      course,
      number,
      deadline,
      student,
      hints,
      brief,
      submitAssignments: [],
    });
    const newAssignment = await assignment.save();

    if (newAssignment?._id) {
      // update course by assignment id
      const singleCourse = await Course.findById(course);

      await Course.findByIdAndUpdate(course, {
        $set: {
          assignments: [...singleCourse.assignments, newAssignment?._id],
        },
      });
    }

    res.status(201).json(newAssignment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// submit assignment controller
const submitAssignmentController = async (req, res) => {
  try {
    const { assignmentId, studentId, hostedUrl, githubUrl } = req.body;

    const submitAssignment = await SubmitAssignment.findOne({
      assignmentId,
      studentId,
    });

    if (submitAssignment?._id) {
      return res
        .status(400)
        .json({ message: "Already Submitted Assignment!!" });
    }

    const newSubmitAssignment = new SubmitAssignment({
      assignmentId,
      studentId,
      hostedUrl,
      githubUrl,
      number: 0,
      submitDate: Date.now(),
      instructorOpinion: "",
    });

    await newSubmitAssignment.save();

    if (newSubmitAssignment?._id) {
      const assignment = await Assignment.findById(assignmentId);

      if (assignment?._id) {
        await Assignment.findByIdAndUpdate(assignmentId, {
          $set: {
            submitAssignments: [
              ...assignment.submitAssignments,
              newSubmitAssignment?._id,
            ],
          },
        });
      }
    }

    res.status(201).json(newSubmitAssignment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// get submit assignment controller
const getSubmitAssingmentController = async (req, res) => {
  try {
    const { assignmentId, studentId } = req.params;

    const submitAssignment = await SubmitAssignment.findOne({
      assignmentId,
      studentId,
    });

    if (!submitAssignment?._id) {
      return res.status(200).json({ notFound: true });
    }

    res.status(200).json(submitAssignment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// assign submit assignment number controller
const assignSubmitAssignmentNumber = async (req, res) => {
  try {
    const { id } = req.params;
    const { number, instructorOpinion } = req.body;

    const submitAssignment = await SubmitAssignment.findByIdAndUpdate(id, {
      $set: { number, instructorOpinion },
    });

    // get assignment for update student profile with assignment number
    const assignment = await SubmitAssignment.findById(id);
    if (assignment?._id) {
      const student = await User.findById(assignment?.studentId);
      if (student?._id) {
        const studentProfile = await Profile.findById(student?.profile);
        studentProfile.assignmentNumber =
          studentProfile?.assignmentNumber + Number(number);
        await studentProfile.save();
      }
    }

    res.status(200).json(submitAssignment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

module.exports = {
  getAllAssignmentsController,
  getAssignmentsByStudentIdController,
  getSingleAssignmentController,
  createAssignmentController,
  submitAssignmentController,
  getSubmitAssingmentController,
  assignSubmitAssignmentNumber,
};
