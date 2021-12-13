const express = require("express");
const router = express.Router();
const BlogModel = require("../../Model/BlogModel");
const UserModel = require("../../Model/UserModel");
const { sendErrorResponse } = require("../../Scripts/errorResolution");

// All endpoints are after -> .../blogs/

router.get("/blog-basic-info", (req, res) => {
	const { skip, limit } = req.query;
	console.log("Retrieving blog posts");

	BlogModel.find({})
		.select({
			authorName: 1,
			keywords: 1,
			readingTime: 1,
			title: 1,
			views: 1,
		})
		.limit(parseInt(limit))
		.skip(parseInt(skip))
		.sort({ _id: -1 })
		.lean()
		.exec()
		.then((posts) => {
			if (posts === []) {
				// res.json({ blogs: [], message: "no new blogs" });
				sendErrorResponse(res, "NO_BLOGS_EXISTS");
			}
			res.json({
				blogs: posts,
			});
		});
});

// If this route is kept above then the request is assumed to come at this endpoing
// as it has a variable in the path so blog-basic-info is assumed as the blogId.
// This is a small bug which can be easily fixed just by changing the route
router.get("/:blogId", (req, res) => {
	BlogModel.findOneAndUpdate(
		{ _id: req.params.blogId },
		{
			$inc: { views: 1 },
		}
	)
		.lean()
		.exec()
		.then((blogContent) => {
			UserModel.findById(blogContent.authorId)
				.select({
					defaultProfilePhoto: 1,
					username: 1,
					_id: 0,
				})
				.lean()
				.exec()
				.then((author) => {
					if (author === null) {
						blogContent = {
							...blogContent,
							defaultProfilePhoto: undefined,
							authorusername: undefined,
						};
					} else {
						blogContent = {
							...blogContent,
							defaultProfilePhoto: author.defaultProfilePhoto,
							authorUsername: author.username,
						};
					}
					res.json(blogContent);
				})
				.catch((err) => {
					sendErrorResponse(res, "BLOGS_NOT_RETRIEVED");
					console.log(
						"THERE WAS AN ERROR WHILE RETREVING THE DEFAULTPROFILEPHOTO"
					);
					console.log(err);
				});
		})
		.catch((err) => {
			sendErrorResponse(res, "BLOG_NOT_RETRIEVED");
			console.log("-------------Error while geting blog data-------------");
			console.log(err);
		});
});

module.exports = router;
