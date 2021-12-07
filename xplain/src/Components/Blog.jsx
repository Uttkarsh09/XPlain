/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./Editor/editorTools";
import { Link } from "react-router-dom";
import { Clock, Calendar } from "react-feather";
import { formatDate } from "./Utilities/validation";
import DisplaySvg from "./Utilities/DisplaySvg";

function Blog({ match }) {
	const [blogInfo, setBlogInfo] = useState(false);
	const [_, setEditor] = useState(false);
	const blogId = match.params.blogId;
	const holder = "editorjs";

	useEffect(() => {
		axios
			.get(`http://localhost:9000/blog/${blogId}`)
			.then((res) => {
				// console.log(res.data);
				const editorConfig = new EditorJS({
					holder: holder,
					data: res.data.content[0],
					readOnly: true,
					logLevel: "INFO",
					tools: EDITOR_JS_TOOLS,
				});
				setBlogInfo(res.data);
				setEditor(editorConfig);
				// axios.put()
			})
			.catch((err) => {
				console.log("there was an error while asking for blog data");
				console.log(err);
			});
		console.log("Request sent");
	}, [blogId]);

	return blogInfo ? (
		<BlogComponent holder={holder} {...blogInfo} />
	) : (
		<Loading />
	);
}

function BlogComponent(props) {
	const {
		_id,
		holder,
		title,
		readingTime,
		authorName,
		authorUsername,
		authorId,
		views,
		defaultProfilePhoto,
	} = props;

	const publishDate = new Date(parseInt(_id.substring(0, 8), 16) * 1000);
	const userExists = authorUsername === undefined ? false : true;

	return (
		<div className="blog container">
			<div className="blog-header">
				<div className="blog-title">{title}</div>
				<div className="blog-metadata">
					<Link
						to={`/user-profile/${authorUsername}`}
						className="author-profile"
					>
						{!userExists ? (
							<>
								<img
									src={window.location.origin + "/defaultProfile.png"}
									className="author-image"
									style={{ objectFit: "cover", objectPosition: "55% 100%" }}
									alt=""
								/>
								{"  "}
								{" ~deleted user~"}
							</>
						) : (
							<>
								<DisplaySvg
									className="author-image"
									svgString={defaultProfilePhoto}
								/>
								{"  "}
								{authorName}
							</>
						)}
					</Link>
					<div className="blog-publish-time">
						<Calendar size="15" color="grey" style={{ marginRight: "5px" }} />
						<span>{formatDate(publishDate)}</span>
					</div>
					<div className="reading-time">
						<Clock size="15" color="grey" style={{ marginRight: "5px" }} />
						<span className="">{readingTime} min read</span>
					</div>
				</div>
			</div>
			<div id={holder} className="editor"></div>
		</div>
	);
}

export default Blog;
