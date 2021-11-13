const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const BlogModel = require("../../Model/BlogModel");

// All endpoints are after -> localhost:PORT/blogs/

router.post("/post", async (req, res) => {
	console.log("POST REQUEST RECIEVED");
	const blogContent = {
		authorId: req.body.authorId,
		authorName: req.body.authorName,
		content: req.body.content,
		keywords: req.body.keywords,
		readingTime: req.body.readingTime,
		title: req.body.title,
	};

	try {
		const uploadedBlog = await new BlogModel(blogContent).save();

		res
			.status(200)
			.json({ msg: "UPLOADED", uploadedBlogID: uploadedBlog["_id"] });
	} catch (err) {
		res.json({ msg: "ERROR", err });
	}
});

module.exports = router;
