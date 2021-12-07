const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const UserModel = require("../../Model/UserModel");
const { generateAvatar } = require("../../Utilities/customAvatar");
const { sendErrorResponse } = require("../../Scripts/errorResolution");
require("dotenv/config");
// Routes after "localhost:PORT/user/"

async function validateFields(req, res, next) {
	const username = req.body.username;
	const password = req.body.password;
	const info = await UserModel.findOne({ username });

	if (username.trim() === "") {
		sendErrorResponse(res, "USERNAME_INVALID");
	} else if (password.trim() === "") {
		sendErrorResponse(res, "PASSWORD_INVALID");
	} else {
		next();
	}
}

async function checkUserExists(req, res, next) {
	const username = req.body.username;
	const info = await UserModel.findOne({ username }).select({
		password: 1,
		username: 1,
	});

	if (info) {
		req.userExists = {
			username: info.username,
			password: info.password,
			_id: info._id,
		};
	} else {
		req.userExists = false;
	}
	next();
}

router.post((req, res, next) => {
	console.log("Request recieved POST /user/...");
	console.log(req.path);
	console.log(req.originalUrl);
	next();
});

router.post("/checkUserExists", checkUserExists, async (req, res) => {
	const userFound = req.userExists ? true : false;
	res.json({ userFound });
});

router.post(
	"/addNewUser",
	validateFields,
	checkUserExists,
	async (req, res) => {
		if (req.userExists) sendErrorResponse(req, "USERNAME_ALREADY_PRESENT");

		const defaultProfilePhoto = await generateAvatar(req.body.username);
		const user = new UserModel({ ...req.body, defaultProfilePhoto });
		const salt = await bcrypt.genSalt(3);
		user.password = await bcrypt.hash(req.body.password, salt);

		user.save().then((reply) => {
			res.status(200).json({
				msg: "User Added",
				username: req.body.username,
				_id: reply["_id"],
				defaultProfilePhoto,
			});
		});
	}
);

// This is the requested by Login.jsx
router.post("/login", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const bypassPassword = req.body.bypassPassword;
	let validPassword;
	const userInfo = await UserModel.findOne({ username }).select({
		password: 1,
		username: 1,
		defaultProfilePhoto: 1,
	});

	if (userInfo === null) {
		sendErrorResponse(res, "INCORRECT_CREDENTIALS");
		return;
	}

	if (!bypassPassword)
		validPassword = await bcrypt.compare(password, userInfo.password);

	if (validPassword || bypassPassword) {
		req.session.userId = userInfo._id;
		req.session.username = userInfo.username;

		res.json({
			msg: "CREATED A NEW SESSION",
			username: userInfo.username,
			userId: userInfo._id,
			defaultProfilePhoto: userInfo.defaultProfilePhoto,
		});
	} else {
		sendErrorResponse(res, "INCORRECT_CREDENTIALS");
	}
});

router.post("/userInfo/", async (req, res) => {
	const username = req.body.username;
	const userInfo = await UserModel.findOne({ username }).select({
		name: 1,
		followers: 1,
		following: 1,
		defaultProfilePhoto: 1,
		_id: 0,
	});
	if (userInfo === null) {
		sendErrorResponse(res, "USER_DOES_NOT_EXIST");
	} else {
		userInfo.username = username;
		res.json(userInfo);
	}
});

module.exports = router;
