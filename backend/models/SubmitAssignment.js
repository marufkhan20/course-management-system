const { Schema, model } = require("mongoose");

const submitAssignmentSchema = new Schema({
  assignmentId: {
    type: Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hostedUrl: {
    type: String,
  },
  githubUrl: {
    type: String,
    required: true,
  },
  submitDate: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
  },
  instructorOpinion: {
    type: String,
  },
});

const SubmitAssignment = model("SubmitAssignment", submitAssignmentSchema);

module.exports = SubmitAssignment;
