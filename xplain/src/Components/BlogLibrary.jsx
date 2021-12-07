import React, { useState, useEffect, useRef } from "react";
import Loading from "./Loading";
import axios from "axios";
import { Eye, Clock } from "react-feather";
import useChangeTitle from "./Utilities/useChangeTitle";
import { Link } from "react-router-dom";

function getBlogBasicInfo(skip, limit) {
	return axios.get("http://localhost:9000/blog/blog-basic-info/", {
		params: { skip: skip.current, limit },
	});
}

function BlogLibrary() {
	const [blogs, setBlogs] = useState([]);
	const skip = useRef(0);
	const limit = 5;

	function loadMoreBlogs() {
		getBlogBasicInfo(skip, limit)
			.then((res) => {
				skip.current = skip.current + limit;
				const newB = res.data.blogs;
				setBlogs((oldBlogs) => [...oldBlogs, ...newB]);
			})
			.catch((err) => {
				console.log("Err in Blog lib");
				console.log(err);
			});
	}

	useChangeTitle("Blogs");

	useEffect(() => {
		loadMoreBlogs();
	}, []);

	return (
		<div>
			{!blogs.length ? (
				<Loading />
			) : (
				<BlogLibraryContent loadMoreBlogs={loadMoreBlogs} blogs={blogs} />
			)}
		</div>
	);
}

function BlogLibraryContent({ blogs, loadMoreBlogs }) {
	return (
		<div className="blog-liberary container">
			<h1>Recent Blogs</h1>
			<div className="blogroll">
				{blogs.map((blog) => {
					return <BlogView key={blog._id} {...blog} />;
				})}
			</div>
			<button onClick={loadMoreBlogs}>Load More</button>
		</div>
	);
}

function BlogView({ title, keywords, readingTime, authorName, views, _id }) {
	return (
		<Link className="blog-block" to={`/blogs/${_id}`}>
			<h2 className="blog-title">{title}</h2>
			<h3 className="blog-author">~ {authorName}</h3>
			<div className="blog-stats">
				<span>
					<Clock
						className="icon"
						size={13}
						// strokeWidth={2}
						stroke="rgb(150, 150, 150)"
					/>{" "}
					{readingTime}
				</span>
				<span>
					<Eye
						className="icon"
						size={13}
						// strokeWidth={2}
						stroke="rgb(150, 150, 150)"
					/>{" "}
					{views}
				</span>
			</div>
		</Link>
	);
}

export default BlogLibrary;
