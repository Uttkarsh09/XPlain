const express = require("express");
const router = express.Router();
const UserModel = require("../../Model/UserModel");
const { sendErrorResponse } = require("../../Scripts/errorResolution");

// Routes after "localhost:PORT/user/"
router.get("/userInfo/:username", async (req, res) => {
	const username = req.params.username;
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
