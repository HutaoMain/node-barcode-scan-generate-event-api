const EventModel = require("../models/EventModel");

const createEvent = async (req, res) => {
  try {
    const newEvent = new EventModel(req.body);
    const event = await newEvent.save();
    res.status(200).json(event);
  } catch (err) {
    console.log(err);
  }
};

const getAllEventList = async (req, res) => {
  try {
    const events = await EventModel.find();
    res.status(200).json(events);
  } catch (err) {
    console.log(err);
  }
};

const getSpecificEvent = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createEvent, getAllEventList, getSpecificEvent };
