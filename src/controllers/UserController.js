const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const {
      lastName,
      firstName,
      middleName,
      course,
      yearLevel,
      email,
      password,
    } = req.body;

    if (
      !lastName ||
      !firstName ||
      !middleName ||
      !course ||
      !yearLevel ||
      !email ||
      !password
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      lastName,
      firstName,
      middleName,
      course,
      yearLevel,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "User logged in successfully", user });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerUser, loginUser };
