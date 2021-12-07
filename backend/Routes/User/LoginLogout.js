const express = require("express");
const router = express.Router();
const { sendErrorResponse } = require("../../Scripts/errorResolution");
const UserModel = require("../../Model/UserModel");
require("dotenv/config");

// localhost:PORT/login

// router.use((req, _, next) => {
// 	console.log("-This is the session info");
// 	console.log(req.session);
// 	console.log("-----------------");
// 	next();
// });

// localhost:PORT/login/
router.post("/login/", async (req, res, next) => {
	const sessionInfo = req.session;
	if (sessionInfo.userId === undefined) {
		console.log("User session ID not found sending error to client");
		sendErrorResponse(res, "SESSION_NOT_FOUND");
	} else {
		const photoInfo = await UserModel.findById(sessionInfo.userId).select({
			defaultProfilePhoto: 1,
			_id: 0,
		});

		res.json({
			msg: "LOGGED IN FROM EXISTING SESSION",
			username: sessionInfo.username,
			userId: sessionInfo.userId,
			defaultProfilePhoto: photoInfo.defaultProfilePhoto,
		});
	}
});

// localhost:PORT/logout/
router.post("/logout/", async (req, res, next) => {
	req.session.destroy();
	res.cookie("XPlainSessionID", "none", {
		expires: new Date(Date.now() - 5 * 1000),
	});
	res.send("");
});

router.post("/deactivate/:username", (req, res) => {
	UserModel.deleteOne({ username: req.params.username })
		.then((_) => {
			req.session.destroy();
			res.cookie("XPlainSessionID", "none", {
				expires: new Date(Date.now() - 5 * 1000),
			});
			res.json({ msg: "USER_DELETED" });
		})
		.catch((err) => {
			console.log("ERROR WHILE DELETING THE USER");
			console.log(err);
			sendErrorResponse(res, "USER_NOT_DELETED");
		});
});

module.exports = router;
