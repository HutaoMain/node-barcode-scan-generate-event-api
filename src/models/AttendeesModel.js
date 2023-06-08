const mongoose = require("mongoose");

const AttendeesSchema = new mongoose.Schema(
  {
    eventName: {
      // both
      type: String,
      required: true,
    },
    eventDateAndTime: {
      //both
      type: String,
    },
    eventLocation: {
      //both
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    attendeeFirstName: {
      //both
      type: String,
      required: true,
    },
    attendeeMiddleName: {
      //both
      type: String,
      required: true,
    },
    attendeeLastName: {
      //both
      type: String,
      required: true,
    },
    attendeeIdNumber: {
      //student
      type: String,
    },
    attendeeYearLevel: {
      //student
      type: String,
    },
    attendeeCourse: {
      //student
      type: String,
    },
    attendeeRelationship: {
      //parent
      type: String,
    },
    status: {
      //parent
      type: String,
      default: "pre-registered",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("attendees", AttendeesSchema);
