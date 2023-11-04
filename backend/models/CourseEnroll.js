const { model, Schema } = require("mongoose");

const courseEnrollSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  profileId: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  paymentMethod: {
    type: String,
  },
  paymentStatus: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Number,
  },
  assignments: {
    type: [Schema.Types.ObjectId],
  },
  status: {
    type: String,
  },
  createdAt: {
    type: Number,
  },
});

const CourseEnroll = model("CourseEnroll", courseEnrollSchema);

module.exports = CourseEnroll;

// course id
// user id
// completed
// status
// assignment
