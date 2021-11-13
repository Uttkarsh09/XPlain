const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const userModel = require("../../Model/UserModel");

// Routes after "localhost:PORT/user/"

router.get("/searchUser", (req, res) => {
	console.log("request to search new user");
});

module.exports = router;
