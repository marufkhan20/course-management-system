const Course = require("../models/Course");
const CourseEnroll = require("../models/CourseEnroll");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Jimp = require("jimp");
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// add new course controller
const addCourseController = async (req, res) => {
  try {
    // extract data from req
    const {
      title,
      category,
      level,
      description,
      coverImage,
      video,
      requirements,
      price,
    } = req.body || {};

    // get user id
    const { userid: userId } = req.user || {};

    let imagePath = null;

    if (coverImage) {
      // upload image
      const buffer = Buffer.from(
        coverImage.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        "base64"
      );

      imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

      try {
        const jimpResp = await Jimp.read(buffer);
        jimpResp
          .resize(300, Jimp.AUTO)
          .write(
            path.resolve(__dirname, `../public/storage/courses/${imagePath}`)
          );
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          error: "Could not process the image!!",
        });
      }
    }

    const course = new Course({
      title,
      category,
      level,
      description,
      coverImage: `/storage/courses/${imagePath}`,
      video,
      requirements,
      price,
      students: [],
      sales: 0,
      creator: userId,
      assignments: [],
    });

    const newCourse = await course.save();

    res.status(201).json({
      message: "Course Created Successfully!!",
      course: newCourse,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// get all courses controller
const getAllCoursesController = async (req, res) => {
  try {
    const courses = await Course.find().populate("creator");

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// get course by course id controller
const getCourseByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "Please Provide Course ID!!",
      });
    }

    const course = await Course.findById(id);
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// get top sale course controller
const getTopSaleCourseController = async (req, res) => {
  try {
    const { userid: userId } = req.user || {};

    if (!userId) {
      return res.status(401).json({
        message: "Authorization Error!!",
      });
    }

    const topCourses = await Course.find().sort({ sales: -1 }).limit(5);

    res.status(200).json(topCourses);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// enroll new course controller
const enrollNewCourseController = async (req, res) => {
  try {
    const {
      courseId,
      stripeToken,
      paymentMethod,
      price,
      totalPrice,
      useRedeem,
    } = req.body;
    const { userid: userId } = req.user;

    if (!courseId) {
      return res.status(400).json({
        error: "Provide a Course ID!!",
      });
    }

    if (!userId) {
      return re.status(401).json({
        error: "Authentication Error!!",
      });
    }

    const user = await User.findById(userId);
    const profileId = user?.profile;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(400).json({
        error: "Course Not Found! Please Provide Valid Course ID!!",
      });
    }

    if (course?._id) {
      // create enroll course object
      const enrollCourseObj = new CourseEnroll({
        courseId,
        userId,
        completed: 0,
        assignments: [],
        profileId,
        createdAt: Date.now(),
        paymentMethod,
      });

      // save enroll course object
      const enrollCourse = await enrollCourseObj.save();

      if (enrollCourse?._id) {
        await Course.findByIdAndUpdate(courseId, {
          $set: { sales: course.sales + 1 },
        });
      }

      await Course.findByIdAndUpdate(courseId, {
        $set: {
          students: [...course?.students, enrollCourse?._id],
        },
      });

      const user = await User.findById(userId);
      if (enrollCourse?._id) {
        if (user?._id && user?.role === "User") {
          await User.findByIdAndUpdate(userId, {
            $set: { role: "student" },
          });
        }
      }

      // Stripe payment
      if (stripeToken) {
        const payment = await stripe.paymentIntents.create({
          amount: price * 100,
          currency: "USD",
          description: "this payment description",
          payment_method: stripeToken,
          confirm: true,
        });

        if (payment) {
          enrollCourse.paymentStatus = true;
          await enrollCourse.save();

          // add credit
          const profile = await Profile.findOne({ userId });
          if (profile?._id) {
            profile.creditPoints =
              Number(profile.creditPoints) + Number(totalPrice) / 10;
          }

          // remove redeem points
          if (useRedeem) {
            profile.redeemPoints = 0;
          }

          await profile.save();

          // add referral user credit points
          const referralUser = await User.findById(user?.referral);

          if (referralUser?._id) {
            const referralUserProfile = await Profile.findById(
              referralUser?.profile
            );

            if (referralUserProfile?._id) {
              referralUserProfile.creditPoints =
                Number(referralUserProfile.creditPoints) + totalPrice / 100;
              await referralUserProfile.save();
            }
          }

          res.status(201).json({ enrollCourse, user, profile });
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!",
    });
  }
};

// get enroll student controller
const getEnrollStudentsController = async (req, res) => {
  try {
    const { userid: userId } = req.user || {};
    const { role } = req.user || {};

    if (!userId) {
      return res.status(400).json({
        error: "Please Login!!",
      });
    }

    if (role !== "admin") {
      return res.status(400).json({
        error: "Can't Access without Admin!!",
      });
    }

    const enrollCourses = await CourseEnroll.find().populate("profileId");

    res.status(200).json(enrollCourses);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// get enroll student by course id controller
const getEnrollStudentsByCourseIdController = async (req, res) => {
  try {
    const { userid: userId } = req.user || {};
    const { role } = req.user || {};
    const { courseId } = req.params;

    if (!userId) {
      return res.status(400).json({
        error: "Please Login!!",
      });
    }

    if (role !== "admin") {
      return res.status(400).json({
        error: "Can't Access without Admin!!",
      });
    }

    const enrollCourses = await CourseEnroll.find({ courseId }).populate(
      "profileId"
    );

    res.status(200).json(enrollCourses);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// get course orders controller
const getCourseOrdersController = async (req, res) => {
  try {
    const courseOrders = await CourseEnroll.find()
      .populate("courseId")
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json(courseOrders);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// get enroll courses by student id controller
const getEnrollCoursesByStudentIdController = async (req, res) => {
  try {
    const { studentId } = req.params;

    const courses = await CourseEnroll.find({ userId: studentId }).populate(
      "courseId"
    );

    res.status(200).json(courses);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!",
    });
  }
};

// upload course certificate controller
const uploadCourseCertificateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { certificate } = req.body;

    console.log("certificate", certificate);

    // upload certificate with compress
    let imagePath = null;

    if (certificate) {
      // upload image
      const buffer = Buffer.from(
        certificate.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        "base64"
      );

      imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

      try {
        const jimpResp = await Jimp.read(buffer);
        jimpResp
          .resize(794, 1123)
          .write(
            path.resolve(
              __dirname,
              `../public/storage/certificates/${imagePath}`
            )
          );

        const course = await Course.findByIdAndUpdate(
          id,
          {
            $set: { certificate: `/storage/certificates/${imagePath}` },
          },
          { new: true }
        );

        res.status(200).json(course);
      } catch (err) {
        return res.status(500).json({
          error: "Could not process the certificate image!!",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

module.exports = {
  addCourseController,
  getAllCoursesController,
  getTopSaleCourseController,
  getCourseByIdController,
  enrollNewCourseController,
  getEnrollStudentsController,
  getEnrollStudentsByCourseIdController,
  getCourseOrdersController,
  getEnrollCoursesByStudentIdController,
  uploadCourseCertificateController,
};
