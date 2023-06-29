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

const getAttendeeById = async (req, res) => {
  try {
    const attendees = await AttendeesModel.findById(req.params.id);
    res.status(200).json(attendees);
  } catch (error) {
    console.log(error);
  }
};

const updateAttendee = async (req, res) => {
  try {
    const attendees = await AttendeesModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(attendees);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createAttendees,
  getAttendeeList,
  updateAttendee,
  getAttendeeById,
};
