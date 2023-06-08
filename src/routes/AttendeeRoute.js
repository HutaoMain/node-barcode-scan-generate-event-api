const router = require("express").Router();
const AttendeeController = require("../controllers/AttendeeController");

router.post("/create", AttendeeController.createAttendees);
router.get("/list", AttendeeController.getAttendeeList);

module.exports = router;
