const Certificate = require("../models/Certificate");
const Course = require("../models/Course");
const path = require("path");

// get certificates by student id controller
const getCertificatesByStudentIdController = async (req, res) => {
  try {
    const { studentId } = req.params;
    const certificates = await Certificate.find({ studentId }).populate(
      "courseId"
    );

    res.status(200).json(certificates);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// get all pending certificates controller
const getPendingCertificatesController = async (req, res) => {
  try {
    const certificates = await Certificate.find({ status: "PENDING" }).populate(
      "courseId"
    );

    res.status(200).json(certificates);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// request for certificate controller
const requestForCertificateController = async (req, res) => {
  try {
    const { userid: studentId } = req.user || {};
    const { courseId, studentName } = req.body;

    const certificate = await Certificate.findOne({ courseId, studentId });

    const { _id, status } = certificate || {};

    if ((_id && status === "PENDING") || status === "APPROVE") {
      return res.status(400).json({
        error:
          "You already request for certificate! Please wait admin response.",
      });
    }

    const newCertificate = new Certificate({
      studentId,
      courseId,
      studentName,
    });

    await newCertificate.save();

    if (newCertificate?._id) {
      res.status(201).json(newCertificate);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// update certificate status controller
const updateCertificateStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const certificate = await Certificate.findByIdAndUpdate(
      id,
      {
        $set: { status },
      },
      { new: true }
    );

    res.status(201).json(certificate);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// download course certificate controller
const downloadCerfiticateController = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (course?._id) {
      const certificate = path.join(
        __dirname,
        `../public${course?.certificate}`
      );
      res.download(certificate);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

module.exports = {
  getCertificatesByStudentIdController,
  requestForCertificateController,
  getPendingCertificatesController,
  updateCertificateStatusController,
  downloadCerfiticateController,
};
