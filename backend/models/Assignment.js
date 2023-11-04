const { Schema, model } = require("mongoose");

const assignmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    student: {
      type: String,
      required: true,
    },
    hints: {
      type: String,
    },
    brief: {
      type: String,
      required: true,
    },
    submitAssignments: {
      type: [Schema.Types.ObjectId],
      ref: "SubmitAssignment",
    },
  },
  { timestamps: true }
);

const Assignment = model("Assignment", assignmentSchema);

module.exports = Assignment;
