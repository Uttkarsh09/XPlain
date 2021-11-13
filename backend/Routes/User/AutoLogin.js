const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const router = express.Router();
const { sendErrorResponse } = require("../../Scripts/errorResolution");
require("dotenv/config");

// localhost:PORT/autoLogin

// router.use((req, _, next) => {
// 	console.log("---------------- This is the session info ----------------");
// 	console.log(req.session);
// 	console.log("---------------------------------------------------------");
// 	next();
// });

router.post("/", async (req, res, next) => {
	const sessionInfo = req.session;

	if (sessionInfo.userId === undefined) {
		console.log("User session ID not found sending error to client");
		sendErrorResponse(res, "SESSION_NOT_FOUND");
	} else {
		res.json({
			msg: "LOGGED IN FROM EXISTING SESSION",
			username: sessionInfo.username,
			userId: sessionInfo.userId,
		});
	}
});

module.exports = router;
