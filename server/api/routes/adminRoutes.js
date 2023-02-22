const express = require("express");
const router = express.Router();

// import controller
const {register, login, getUsers, createScooter, deleteScooter} = require("../controller/adminController");

// @desc    Register a new admin
router.route("/register").post(register);

// @desc    Login a admin
router.route("/login").post(login);

// @desc    Get all admins
router.route("/allAdmins").get(getUsers);

// @desc    Create new scooter
router.route("/scooter").post(createScooter);

// @desc    Delete scooter
router.route("/scooter/:id").delete(deleteScooter);


// export route file
module.exports = router;
