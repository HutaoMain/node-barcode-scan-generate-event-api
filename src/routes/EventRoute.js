const router = require("express").Router();
const EventController = require("../controllers/EventController");

router.post("/create", EventController.createEvent);
router.get("/list", EventController.getAllEventList);
router.get("/:id", EventController.getSpecificEvent);

module.exports = router;
