const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// All endpoints are after -> localhost:PORT/editorjs/

router.get("/", async(req, res) => {
	const requestedURL = req.query.url;
	console.log(req.query);

	try{
		const videoDetails = await fetch(`https://noembed.com/embed?url=${requestedURL}`);
		const videoDetailsJson = await videoDetails.json();

		if(videoDetailsJson.title === undefined){
			throw "invalid video url";
		}

		const responseObject = {
			success: 1,
			meta: {
				title: videoDetailsJson.title,
				description: videoDetailsJson.author_name,
				image: {
					url: videoDetailsJson.thumbnail_url,
				}
			}
		}

		console.log(responseObject)
		res.json(responseObject)
	} catch (error){
		console.log("ERROR WHILE SENDING DATA TO EDITORJS/LINK");
		console.log(error);
		
		res.json({
			type: "linkTool",
			data: {
				success: 0,
			}
		})
	}
})


module.exports = router;