const errorCodes = {
	USERNAME_ALREADY_PRESENT: 6901,
	USERNAME_INVALID: 6902,
	INCORRECT_CREDENTIALS: 6903,
	INCORRECT_PASSWORD: 6904,
	USER_DOES_NOT_EXIST: 6905,
	CANNOT_LOGIN: 6906,
	SESSION_NOT_FOUND: 6907,
};

function sendErrorResponse(res, errorMsg, statusCode = 500) {
	try {
		res
			.status(statusCode)
			.json({ errorCode: errorCodes[errorMsg], errorMsg: "SESSION_NOT_FOUND" });
	} catch (err) {
		console.log("~~~~~~ERROR~~~~~~~~");
		console.log(err.message);
	}
}

module.exports = { errorCodes, sendErrorResponse };
