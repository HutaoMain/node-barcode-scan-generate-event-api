const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const cors = require("cors");

const UserRoute = require("./routes/UserRoute");
const EventRoute = require("./routes/EventRoute");
const AttendeeRoute = require("./routes/AttendeeRoute");

dotEnv.config();

const app = express();
app.use(express.json());

app.use(cors("*"));

const client = require("twilio")(
  process.env.TWILIO_ACCSID,
  process.env.TWILIO_AUTH_TOKEN
);

//mongoose connection here
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("connected to mongoDb");
  } catch (error) {
    throw error;
  }
};

app.use("/api/user", UserRoute);
app.use("/api/event", EventRoute);
app.use("/api/attendee", AttendeeRoute);

app.post("/api/attendee/sms/create", async (req, res) => {
  // Process the attendee creation logic and obtain the attendee details
  const attendee = req.body;

  try {
    // Save the attendee in the database
    // ...

    // Send SMS from the backend
    const message =
      "Thank you for registering. We look forward to seeing you at the event!";
    const phoneNumber = attendee.phoneNumber;
    await sendSMS(phoneNumber, message);

    res.status(200).json({ message: "Attendee created successfully" });
  } catch (error) {
    console.error("Failed to create attendee:", error);
    res.status(500).json({ error: "Failed to create attendee" });
  }
});

const sendSMS = async (phoneNumber, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    console.log("SMS sent successfully. SID:", response.sid);
  } catch (error) {
    console.error("Failed to send SMS:", error);
  }
};

const port = 5000;

app.listen(process.env.PORT || port, () => {
  connect();
  console.log(`server is listening to port ${port}`);
});
