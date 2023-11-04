const { model, Schema } = require("mongoose");

const courseSchema = new Schema(
  {
    title: {
      type: String,
      min: 10,
      required: true,
    },
    category: {
      type: String,
      min: 3,
      required: true,
    },
    level: {
      type: String,
      min: 3,
      required: true,
    },
    description: {
      type: String,
      min: 10,
      required: true,
    },
    coverImage: {
      type: String,
      min: 5,
      required: true,
    },
    video: {
      type: String,
    },
    requirements: {
      type: Array,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    students: {
      type: [Schema.Types.ObjectId],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignments: {
      type: [Schema.Types.ObjectId],
    },
    sales: {
      type: Number,
      required: true,
    },
    certificate: {
      type: String,
    },
  },
  { timestamps: true }
);

const Course = model("Course", courseSchema);

module.exports = Course;
