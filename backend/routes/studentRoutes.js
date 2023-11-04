const { getTopStudentController } = require("../controllers/studentController");

const router = require("express").Router();

router.get("/top-students", getTopStudentController);

module.exports = router;
