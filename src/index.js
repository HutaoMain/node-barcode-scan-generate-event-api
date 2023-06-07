const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const cors = require("cors");

const UserRoute = require("./routes/UserRoute");

dotEnv.config();

const app = express();
app.use(express.json());

app.use(cors());

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

app.listen(5000, () => {
  connect();
  console.log("server is listening to port 5000");
});
