const Profile = require("../models/Profile");
const imageUploader = require("../services/imageUploadService");

// get single profile controller
const getSingleProfileController = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await Profile.findOne({ userId });

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// update profile controller
const updateProfileController = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      profileImage,
      firstName,
      lastName,
      birthday,
      country,
      address1,
      address2,
      city,
      zipCode,
      education,
      id,
      resume,
    } = req.body;

    // upload profile image
    const profileImagePath = await imageUploader(profileImage, res, 150);

    // upload resume
    const resumeImagePath = await imageUploader(resume, res, 450);

    // upload id
    const idImagePath = await imageUploader(id, res, 200);

    // get profile
    const existingProfile = await Profile.findOne({ userId });

    // update profile
    const udpatedProfileObject = {
      profileImage: profileImagePath
        ? `/storage/${profileImagePath}`
        : existingProfile.profileImage,
      firstName,
      lastName,
      birthday,
      country,
      address1,
      address2,
      city,
      zipCode,
      resume: resumeImagePath
        ? `/storage/${resumeImagePath}`
        : existingProfile.resume,
      id: idImagePath ? `/storage/${idImagePath}` : existingProfile.id,
      education,
    };

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId },
      udpatedProfileObject,
      {
        new: true,
      }
    );

    res.status(200).json(updatedProfile);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

module.exports = {
  updateProfileController,
  getSingleProfileController,
};
