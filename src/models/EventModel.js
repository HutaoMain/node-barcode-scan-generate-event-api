const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventDateAndTime: {
      type: String,
      required: true,
    },
    eventLocation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("events", EventSchema);
