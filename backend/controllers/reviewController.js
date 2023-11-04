const Profile = require("../models/Profile");
const Review = require("../models/Review");

// get all review controller
const getAllReviewController = async (req, res) => {
  try {
    const reviews = await Review.find().populate("profile");
    res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// create new review controller
const createNewReviewController = async (req, res) => {
  try {
    const { id, courseId, review, profession } = req.body || {};

    if (!id) {
      return res.status(400).json({
        error: "Please Provide a Valid User ID!!",
      });
    }

    if (!review) {
      return res.status(400).json({
        error: "Review is Required!!",
      });
    }

    // get user profile
    const profile = await Profile.findOne({ userId: id });

    console.log("profile", profile);

    let createReview;

    if (profile?._id) {
      createReview = new Review({
        course: courseId,
        profession,
        review,
        user: id,
        profile: profile?._id,
      });
    } else {
      createReview = new Review({
        course: courseId,
        profession,
        review,
        user: id,
      });
    }

    const newReview = await createReview.save();

    if (newReview?._id) {
      return res.status(201).json(newReview);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

module.exports = {
  getAllReviewController,
  createNewReviewController,
};
