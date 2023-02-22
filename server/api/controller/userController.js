const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
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

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create admin
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    token: generateToken(),
  });

  //   if admin created send success message
  if (user) {
    res.status(201).json({
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Incorrect email or password");
  }
});

// @desc    Auth user & get token
// @route   POST /api/admin/login
// @access  Public

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Rent a scooter
// @route   POST /user/rent
// @access  Private

const rentScooter = asyncHandler(async (req, res) => {
  const scooterId = req.params.id;
  if (!scooterId) {
    res.status(400);
    throw new Error("Scooter not found");
  }
  
  const rent = await Scooter.findByIdAndUpdate(scooterId, {
    isRented: "Rented",
  });
  
  const newScooter = await Scooter.findById(scooterId);

  if (rent) {
    res.status(200).json(newScooter);
  } else {
    res.status(400);
    throw new Error("Scooter not found");
  }
});

// @desc    Get all scooters
// @route   GET /allScooters
// @access  Private

const getScooters = asyncHandler(async (req, res) => {
  // const scooters = await Scooter.find({ isRented: "Not Rented"});
  const scooters = await Scooter.find({});
  res.json(scooters);
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
  getScooters,
  rentScooter,
};
