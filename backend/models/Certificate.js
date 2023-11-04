const { model, Schema } = require("mongoose");

const certificateSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "PENDING",
  },
});

const Certificate = model("Certificate", certificateSchema);

module.exports = Certificate;
