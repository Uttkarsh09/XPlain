const express = require("express");
const router = express.Router();
const UserModel = require("../../Model/UserModel");
const { sendErrorResponse } = require("../../Scripts/errorResolution");
const { shallowEqual } = require("../../Scripts/general");
const { generateAvatar } = require("../../Utilities/customAvatar");

async function checkDocumentExists(model, query, requiredFields) {
	const info = await model.findOne(query).select(requiredFields);
	console.log("INFO === ");
	console.log(info);

	if (info) {
		if (shallowEqual(requiredFields, {})) {
			return true;
		} else {
			return info;
		}
	} else {
		return false;
	}
}

router.put("/update-data/:username", async (req, res) => {
	const oldUsername = req.params.username;
	const newUsername = req.body.username;
	const newName = req.body.name;
	const fieldsChanged = req.body.fieldsChanged;
	const filedsToUpdate = {};

	if (fieldsChanged.username === true) {
		const usernameTaken = await checkDocumentExists(
			UserModel,
			{ username: newUsername },
			{}
		);
		if (usernameTaken) {
			sendErrorResponse(res, "USERNAME_ALREADY_PRESENT");
			return;
		}
		filedsToUpdate.username = newUsername;
		filedsToUpdate.defaultProfilePhoto = await generateAvatar(newUsername);
	}

	if (fieldsChanged.name === true) {
		filedsToUpdate.name = newName;
	}

	UserModel.updateOne({ username: oldUsername }, filedsToUpdate)
		.then((_) => {
			res.json({
				msg: "BLOG UPDATED",
				defaultProfilePhoto: filedsToUpdate.defaultProfilePhoto,
			});
		})
		.catch((err) => {
			sendErrorResponse(res, "BLOG_NOT_UPDATED");
			console.log("There was an error while uploading the blog");
		});
});

module.exports = router;
