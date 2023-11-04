const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: Number,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    courses: {
      type: Schema.Types.ObjectId,
      ref: "StudentCourses",
    },
    role: {
      type: String,
      default: "User",
    },
    referral: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    referralUser: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
