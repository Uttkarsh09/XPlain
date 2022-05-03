const express = require("express");
const router = express.Router();
const UserModel = require("../../Model/UserModel");
const BlogModel = require("../../Model/BlogModel");
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
	console.log("updating the username");
	const oldUsername = req.params.username;
	const oldProfilePhoto = req.body.defaultProfilePhoto;
	const newUsername = req.body.username;
	const newName = req.body.name;
	let authorID = req.body.userId;
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
		// filedsToUpdate.defaultProfilePhoto = await generateAvatar(newUsername);
		filedsToUpdate.defaultProfilePhoto = oldProfilePhoto;
	}

	if (fieldsChanged.name === true) {
		filedsToUpdate.name = newName;
	}

	// UPDATING THE USER DETAILS IN THE USERS-COLLECTION
	UserModel.updateOne({ username: oldUsername }, filedsToUpdate)
		.then((_) => {
			console.log("User updated UPDATED");
			return BlogModel.updateMany(
				{ authorId: authorID },
				{
					// If you wanna have the username here chance the newName to newUsername
					authorName: newName,
				}
			);
		})
		.then((_) => {
			console.log("blog updatedd");
			res.json({
				msg: "BLOG UPDATED",
				// defaultProfilePhoto: filedsToUpdate.defaultProfilePhoto,
			});
		})
		.catch((err) => {
			sendErrorResponse(res, "BLOG_NOT_UPDATED");
			console.log("There was an error while uploading the blog");
		});
});

module.exports = router;
