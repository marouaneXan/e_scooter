const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const Scooter = require("../models/scooterModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc    Register a new admin
// @route   POST /admin/register
// @access  Public

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //   check if any of the fields are empty
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  //   check if the admin already exists

  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create admin
  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
    token: generateToken(),
  });

  //   if admin created send success message
  if (admin) {
    res.status(201).json({
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Incorrect email or password");
  }
});

// @desc    Auth user & get token
// @route   POST /admin/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await User.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Create new scooter
// @route   POST /admin/scooter
// @access  Private

const createScooter = asyncHandler(async (req, res) => {
  const { latitude, longitude, model, battery, price } = req.body;

  if (!latitude || !longitude || !model || !battery || !price) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const scooter = await Scooter.create({
    latitude,
    longitude,
    isRented: "Not Rented",
    model,
    battery,
    price,
  });

  if (scooter) {
    res.status(201).json({
      message: "Scooter created successfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid scooter data");
  }
});

// @desc    Delete scooter
// @route   DELETE /admin/scooter/:id
// @access  Private

const deleteScooter = asyncHandler(async (req, res) => {
  const scooter = await Scooter.findById(req.params.id);

  if (scooter) {
    await scooter.remove();
    res.json({ message: "Scooter removed" });
  } else {
    res.status(404);
    throw new Error("Scooter not found");
  }
});

// @desc    Get all users
// @route   GET /allUsers
// @access  Private

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  register,
  login,
  getUsers,
  createScooter,
  deleteScooter,
};
