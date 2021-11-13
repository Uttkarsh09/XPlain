const express = require("express");
const router = express.Router();
const Blog = require("../../Model/BlogModel");

// All endpoints are after -> .../blogs/

router.get("/post", (req, res) => {
	console.log("Retrieving blog posts");
	Blog.find({}).then((posts) => {
		res.json({
			blogs: posts,
		});
	});
});

module.exports = router;
