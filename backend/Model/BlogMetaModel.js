const mongoose = require("mongoose");

const schema = {
	// authorName: { type: String },
	// coverImage: Image,
	blogId: { type: Number },
	keywords: { type: Array },
	publishDate: { type: Number },
	readTime: { type: Number },
	title: { type: String },
};

const requiredFields = [
	"blogId",
	"keywords",
	"publishDate",
	"readTime",
	"title",
];
requiredFields.forEach((field) => {
	schema[field].required = true;
});

const blogMetaSchema = new mongoose.Schema(schema);
module.exports = mongoose.model("blogs_metadata", blogMetaSchema);
