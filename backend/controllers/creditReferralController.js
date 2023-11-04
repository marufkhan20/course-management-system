const Profile = require("../models/Profile");

// convert credit to redeem points controller
const convertCreditToRedeemController = async (req, res) => {
  try {
    const { profileId, creditPoints } = req.body || {};

    if (!profileId) {
      return res.status(400).json({
        error: "Please Provide a Valid Profile ID!!",
      });
    }

    if (!creditPoints) {
      return res.status(400).json({
        error: "Credit Points is Required!!",
      });
    }

    if (creditPoints < 6000) {
      return res.status(400).json({
        error: "You can redeem only if you have 6000 credits in your account.",
      });
    }

    const profile = await Profile.findById(profileId);

    if (profile?._id) {
      profile.creditPoints = 0;
      profile.redeemPoints = profile.redeemPoints + creditPoints;
      await profile.save();

      return res.status(200).json(profile);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// get credit points controller
const getCreditPointsController = async (req, res) => {
  try {
    const { id } = req.params || {};

    if (!id) {
      return res.status(400).json({
        error: "Please Provide a Valid Profile ID!!",
      });
    }

    const profile = await Profile.findById(id);

    if (profile?._id) {
      res.status(200).json(profile?.creditPoints);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

module.exports = {
  convertCreditToRedeemController,
  getCreditPointsController,
};
