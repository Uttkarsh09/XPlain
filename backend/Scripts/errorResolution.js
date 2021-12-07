const errorCodes = {
	USERNAME_ALREADY_PRESENT: 1,
	USERNAME_INVALID: 2,
	INCORRECT_CREDENTIALS: 3,
	INCORRECT_PASSWORD: 4,
	USER_DOES_NOT_EXIST: 5,
	CANNOT_LOGIN: 6,
	SESSION_NOT_FOUND: 7,
	BLOG_NOT_RETRIEVED: 8,
	BLOG_NOT_UPLOADED: 9,
	BLOG_NOT_UPDATED: 10,
	USER_NOT_DELETED: 11,
};

function sendErrorResponse(res, errorMsg, statusCode = 500) {
	try {
		res
			.status(statusCode)
			.json({ errorCode: errorCodes[errorMsg], errorMsg: errorMsg });
	} catch (err) {
		console.log("~~~~~~ERROR~~~~~~~~");
		console.log(err.message);
	}
}

module.exports = { errorCodes, sendErrorResponse };
