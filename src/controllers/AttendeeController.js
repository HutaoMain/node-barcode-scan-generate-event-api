const AttendeesModel = require("../models/AttendeesModel");

const createAttendees = async (req, res) => {
  try {
    const newAttendees = new AttendeesModel(req.body);
    const attendees = await newAttendees.save();
    res.status(200).json(attendees);
  } catch (error) {
    console.log(error);
  }
};

const getAttendeeList = async (req, res) => {
  try {
    const attendees = await AttendeesModel.find();
    res.status(200).json(attendees);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createAttendees, getAttendeeList };
