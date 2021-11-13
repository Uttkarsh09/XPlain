const express = require("express");
const router = express.Router();
const MetadataModel = require("../../Model/MetadataModel");

router.get("/getKeywordSuggestions", async (req, res, next) => {
	console.log("Request to get metadata suggestions");
	const suggestionsInfo = await MetadataModel.findOne({}).select({
		suggestions: 1,
	});
	console.log(suggestionsInfo);
	res.status(200).json({
		data: suggestionsInfo.suggestions,
	});
});
