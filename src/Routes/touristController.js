// #Task route solution
const userModel = require("../Models/User.js");
const { default: mongoose } = require("mongoose");

const createTourist = async (req, res) => {
  try {
    const {
      userName,
      Email,
      Password,
      mobile_num,
      Nationality,
      DOB,
      Occupation,
    } = req.body;
    const newUser = new userModel({
      userName,
      Email,
      Password,
      mobile_num,
      Nationality,
      DOB,
      Occupation,
    });

    // Calculate age
    const birthDate = new Date(DOB);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    //  // Check if age is less than 18
    //  if (age < 18) {
    //    return res.status(400).json({
    //      message: "User must be at least 18 years old to create an account.",
    //    });
    //  }

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: err.message });
  }
};

const createOccupation = async (req, res) => {
  try {
    const { userName, Email, Password } = req.body;
    const newUser = new userModel({
      userName,
      Email,
      Password,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const { Name, Email, Age } = req.query;
    const filter = {};

    if (Name) filter.Name = Name;
    if (Email) filter.Email = Email;
    if (Age) filter.Age = Age;

    const users = await userModel.find(filter);
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve users", error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id } = req.body;

    const updateData = req.body;

    delete updateData.id;

    const updatedUser = await userModel.findOneAndUpdate({ _id }, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { Name, Email, Age } = req.body;

    const deletedUser = await userModel.findByDelete({ Name, Email, Age });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: err.message });
  }
};

module.exports = {
  createTourist,
  getUsers,
  updateUser,
  deleteUser,
  createOccupation,
};
