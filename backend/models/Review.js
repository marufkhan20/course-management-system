const { model, Schema } = require("mongoose");

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  profession: {
    type: String,
  },
  review: {
    type: String,
    required: true,
  },
});

const Review = model("Review", reviewSchema);

module.exports = Review;
