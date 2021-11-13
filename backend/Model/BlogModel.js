const mongoose = require("mongoose");
const createSchema = require("../Scripts/createSchema");

const schema = {
	authorId: { type: String },
	authorName: { type: String },
	content: { type: Array },
	keywords: { type: Array, default: [] },
	readingTime: { type: Number, min: 0, max: 120 },
	title: { type: String },
	views: { type: Number, default: 0 },

	// publishTime: { type: Number },
	// comments_or_reactions: {}
	// coverImage: Image,
	// authorName: {
	// 	type: String,
	// }
};

const requiredFields = [
	"authorId",
	"authorName",
	"content",
	"keywords",
	"readingTime",
	"title",
];

const blogSchema = new mongoose.Schema(createSchema(schema, requiredFields));
module.exports = mongoose.model("blogs", blogSchema);
