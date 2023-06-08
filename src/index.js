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

app.use(
  cors({
    origin: ["http://127.0.0.1:5173", process.env.CLIENT_URL],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
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

app.listen(5000, () => {
  connect();
  console.log("server is listening to port 5000");
});
