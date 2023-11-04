const { Schema, model } = require("mongoose");

const profileSchema = new Schema(
  {
    profileImage: {
      type: String,
    },
    firstName: {
      type: String,
      min: 2,
    },
    lastName: {
      type: String,
      min: 3,
    },
    birthday: {
      type: String,
    },
    country: {
      type: String,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    education: {
      type: String,
    },
    id: {
      type: String,
    },
    resume: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    creditPoints: {
      type: Number,
      default: 0,
    },
    redeemPoints: {
      type: Number,
      default: 0,
    },
    assignmentNumber: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Profile = model("Profile", profileSchema);
module.exports = Profile;
